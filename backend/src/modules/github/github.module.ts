import { Module } from '@nestjs/common';
import { GithubService } from './service/github.service';
import { GithubApi } from './infrastructure/github.api';
import { githubClientProvider } from './infrastructure/github.client';

@Module({
  providers: [GithubService, GithubApi, githubClientProvider],
  exports: [GithubService],
})
export class GithubModule {}
