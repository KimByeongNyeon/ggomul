// import { Injectable } from '@nestjs/common';
// import { GithubService } from 'src/modules/github/service/github.service';

// @Injectable()
// export class DashboardService {
//   constructor(private readonly githubService: GithubService) {}

//   async getDashboard(username: string) {
//     const [stats, languages] = await Promise.all([
//       this.githubService.getStats(username),
//       this.githubService.getLanguageStats(username),
//     ]);

//     return {
//       github: {
//         stats,
//         languages,
//       },
//     };
//   }
// }
