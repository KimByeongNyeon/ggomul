import { Inject, Injectable } from '@nestjs/common';
import type { AxiosInstance } from 'axios';
import { SolvedacUserDto } from '../dto/solvedac-user-dto';
import { SolvedacProblemStatDto } from '../dto/solvedac-problem-stat-dto';

@Injectable()
export class BaekjoonApi {
  constructor(
    @Inject('BAEKJOON_CLIENT')
    private readonly baekjoonClient: AxiosInstance,
  ) {}

  async getUser(handle: string): Promise<SolvedacUserDto> {
    const res = await this.baekjoonClient.get<SolvedacUserDto>('/user/show', {
      params: { handle },
    });
    return res.data;
  }

  async getProblemStats(handle: string): Promise<SolvedacProblemStatDto[]> {
    const res = await this.baekjoonClient.get<SolvedacProblemStatDto[]>(
      '/user/problem_stats',
      { params: { handle } },
    );
    return res.data;
  }
}
