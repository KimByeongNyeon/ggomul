import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardFacade } from '../facade/dashboard.facade';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardFacade: DashboardFacade) {}

  @Get(':githubUsername')
  getDashboard(
    @Param('githubUsername') githubUsername: string,
    @Query('handle') baekjoonHandle: string,
  ) {
    return this.dashboardFacade.getDashboard(githubUsername, baekjoonHandle);
  }
}
