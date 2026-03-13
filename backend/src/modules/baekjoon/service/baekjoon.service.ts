import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { BaekjoonApi } from '../infrastructure/baekjoon.api';
import {
  BaekjoonUserStats,
  BaekjoonTierStat,
} from 'src/modules/dashboard/dto/dashboard.dto';

/**
 * 서비스 내부에 외부 API 통신 로직을 넣지 않고 외부에 어댑터 계층을 두어
 * 외부 API에 서비스가 직접 의존하지 않도록 설계함
 */
@Injectable()
export class BaekjoonService {
  constructor(private readonly baekjoonApi: BaekjoonApi) {}

  async getUserStats(handle: string): Promise<BaekjoonUserStats> {
    try {
      const user = await this.baekjoonApi.getUser(handle);
      return {
        handle: user.handle,
        tier: user.tier,
        rating: user.rating,
        solvedCount: user.solvedCount,
        rank: user.rank,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new NotFoundException('solved.ac 유저를 찾을 수 없어요..ㅠㅠ');
      }
      throw new InternalServerErrorException(
        'solved.ac API 불러오는 중에 오류가 발생했어요..ㅠㅠ',
      );
    }
  }

  async getProblemTierStats(handle: string): Promise<BaekjoonTierStat[]> {
    try {
      const stats = await this.baekjoonApi.getProblemStats(handle);
      // level 0(Unrated) 제외, solved > 0인 항목만 반환
      return stats
        .filter((s) => s.level > 0 && s.solved > 0)
        .map((s) => ({ level: s.level, solved: s.solved, total: s.total }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new NotFoundException('solved.ac 유저를 찾을 수 없어요..ㅠㅠ');
      }
      throw new InternalServerErrorException(
        'solved.ac API 불러오는 중에 오류가 발생했어요..ㅠㅠ',
      );
    }
  }
}
