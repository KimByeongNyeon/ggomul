import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport-github2';
import { UserService } from '../../user/service/user.service';
import { RedisService } from '../../redis/redis.service';
import { JwtPayload } from '../dto/jwt-payload.dto';

// Access Token: API 요청 시 사용, 수명 짧게 (1시간)
// Refresh Token: Access Token 재발급용, 수명 길게 (7일), Redis에 저장
const REFRESH_TTL_SECONDS = 7 * 24 * 60 * 60; // 7일을 초로 환산

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async githubLogin(
    profile: Profile,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const githubId = profile.id;
    const githubLogin = profile.username ?? '';
    const avatarUrl = profile.photos?.[0]?.value ?? null;

    const user = await this.userService.findOrCreateByGithub({
      githubId,
      githubLogin,
      avatarUrl,
    });

    const payload: JwtPayload = { sub: user.id, githubLogin };

    // configService.get()은 string을 반환하지만 JwtService는 ms 라이브러리 타입을 요구
    // as unknown as number로 캐스팅하여 처리 (NestJS 공식 패턴)
    const accessExpiresIn = this.configService.get<string>(
      'JWT_ACCESS_EXPIRES_IN',
      '1h',
    ) as unknown as number;

    const refreshExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_EXPIRES_IN',
      '7d',
    ) as unknown as number;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: accessExpiresIn }),
      this.jwtService.signAsync(payload, { expiresIn: refreshExpiresIn }),
    ]);

    // Redis에 Refresh Token 저장: 키는 "refresh:{userId}", TTL은 7일
    await this.redisService.set(
      `refresh:${user.id}`,
      refreshToken,
      REFRESH_TTL_SECONDS,
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    // 1. Refresh Token의 서명과 만료 여부 검증
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken);
    } catch {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }

    // 2. Redis에 저장된 토큰과 일치하는지 확인 (탈취된 토큰 방어)
    const stored = await this.redisService.get(`refresh:${payload.sub}`);
    if (!stored || stored !== refreshToken) {
      throw new UnauthorizedException(
        '만료되었거나 이미 사용된 리프레시 토큰입니다.',
      );
    }

    // 3. 새 Access Token 발급
    const newPayload: JwtPayload = {
      sub: payload.sub,
      githubLogin: payload.githubLogin,
    };

    const newAccessExpiresIn = this.configService.get<string>(
      'JWT_ACCESS_EXPIRES_IN',
      '1h',
    ) as unknown as number;

    const accessToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: newAccessExpiresIn,
    });

    return { accessToken };
  }

  async logout(userId: string): Promise<void> {
    // Redis에서 Refresh Token 삭제 → 해당 유저는 재로그인 필요
    await this.redisService.del(`refresh:${userId}`);
  }
}
