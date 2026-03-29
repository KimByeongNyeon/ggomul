import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { Profile } from 'passport-github2';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { JwtPayload } from '../dto/jwt-payload.dto';

// Refresh Token 쿠키 이름을 상수로 관리
const REFRESH_TOKEN_COOKIE = 'refresh_token';

// 쿠키 옵션: JS에서 접근 불가(httpOnly), HTTPS에서만 전송(secure), 같은 사이트에서만(sameSite)
const COOKIE_OPTIONS = {
  httpOnly: true, // XSS 방어: JavaScript에서 document.cookie로 접근 불가
  secure: process.env.NODE_ENV === 'production', // 로컬 개발 시엔 false, 배포 시엔 true
  sameSite: 'strict' as const, // CSRF 방어: 다른 사이트에서 온 요청엔 쿠키 미포함
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 (밀리초 단위)
};

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin(): void {
    // GitHub으로 리다이렉트 (Passport가 처리)
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const profile = req.user as Profile;
    this.logger.log(`GitHub 로그인 시도: ${profile.username}`);

    const { accessToken, refreshToken } =
      await this.authService.githubLogin(profile);

    this.logger.log(`GitHub 로그인 성공: ${profile.username}`);

    // refreshToken은 HttpOnly 쿠키에 심어줌 → 클라이언트 JS에서 접근 불가
    res.cookie(REFRESH_TOKEN_COOKIE, refreshToken, COOKIE_OPTIONS);

    // accessToken을 쿼리 파라미터로 프론트에 전달
    const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?accessToken=${accessToken}`);
  }

  // Refresh Token으로 새 Access Token 발급
  // 클라이언트는 body 없이 요청만 하면 됨 (브라우저가 쿠키 자동 포함)
  @Post('refresh')
  async refresh(@Req() req: Request): Promise<{ accessToken: string }> {
    const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE] as
      | string
      | undefined;
    if (!refreshToken) {
      this.logger.warn('토큰 갱신 실패: 리프레시 토큰 없음');
      throw new UnauthorizedException('리프레시 토큰이 없습니다.');
    }
    this.logger.log('토큰 갱신 요청');
    const result = await this.authService.refresh(refreshToken);
    this.logger.log('토큰 갱신 성공');
    return result;
  }

  // 로그아웃: JWT 인증 후 Redis에서 Refresh Token 삭제 + 쿠키 제거
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const user = req.user as JwtPayload;
    this.logger.log(`로그아웃: userId=${user.sub}`);
    await this.authService.logout(user.sub);

    // 쿠키도 함께 삭제
    res.clearCookie(REFRESH_TOKEN_COOKIE, COOKIE_OPTIONS);

    return { message: '로그아웃 되었습니다.' };
  }
}
