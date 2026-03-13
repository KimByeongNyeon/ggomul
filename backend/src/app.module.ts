import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { GithubModule } from './modules/github/github.module';
import { BaekjoonModule } from './modules/baekjoon/baekjoon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    DashboardModule,
    GithubModule,
    BaekjoonModule,
  ],
})
export class AppModule {}
