import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { DashboardFacade } from '../facade/dashboard.facade';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { JwtPayload } from 'src/modules/auth/dto/jwt-payload.dto';
import {
  GithubReposResponse,
  GithubCommitsResponse,
  GithubContributionsResponse,
} from 'src/modules/github/dto/github-my-dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardFacade: DashboardFacade) {}

  @Get('me/repos')
  @UseGuards(JwtAuthGuard)
  async getMyRepos(@Req() req: Request): Promise<GithubReposResponse> {
    const user = req.user as JwtPayload;
    return await this.dashboardFacade.getMyRepos(user.githubLogin);
  }

  @Get('me/commits')
  @UseGuards(JwtAuthGuard)
  async getMyCommits(@Req() req: Request): Promise<GithubCommitsResponse> {
    const user = req.user as JwtPayload;
    return await this.dashboardFacade.getMyCommits(user.githubLogin);
  }

  @Get('me/contributions')
  @UseGuards(JwtAuthGuard)
  async getMyContributions(
    @Req() req: Request,
  ): Promise<GithubContributionsResponse> {
    const user = req.user as JwtPayload;
    return await this.dashboardFacade.getMyContributions(user.githubLogin);
  }

  // @Get(':githubUsername')
  // getDashboard(
  //   @Param('githubUsername') githubUsername: string,
  //   @Query('handle') baekjoonHandle: string,
  // ) {
  //   return this.dashboardFacade.getDashboard(githubUsername, baekjoonHandle);
  // }
}
