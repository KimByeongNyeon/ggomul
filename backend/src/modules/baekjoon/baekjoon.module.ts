import { Module } from '@nestjs/common';
import { baekjoonClientProvider } from './infrastructure/baekjoon.client';
import { BaekjoonApi } from './infrastructure/baekjoon.api';
import { BaekjoonService } from './service/baekjoon.service';

@Module({
  providers: [baekjoonClientProvider, BaekjoonApi, BaekjoonService],
  exports: [BaekjoonService],
})
export class BaekjoonModule {}
