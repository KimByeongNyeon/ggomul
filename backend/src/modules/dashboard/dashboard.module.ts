import { Module } from '@nestjs/common';
import { GithubModule } from '../github/github.module';
import { BaekjoonModule } from '../baekjoon/baekjoon.module';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardFacade } from './facade/dashboard.facade';

@Module({
  imports: [GithubModule, BaekjoonModule],
  controllers: [DashboardController],
  providers: [DashboardFacade],
})
export class DashboardModule {}
