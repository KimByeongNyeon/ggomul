import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export const githubClientProvider = {
  provide: 'GITHUB_CLIENT',
  useFactory: (configService: ConfigService) => {
    const token = configService.get<string>('GITHUB_TOKEN');

    return axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      },
    });
  },
  inject: [ConfigService],
};
