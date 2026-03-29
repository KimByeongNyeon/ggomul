import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

interface GithubProfile {
  githubId: string;
  githubLogin: string;
  avatarUrl: string | null;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateByGithub(profile: GithubProfile): Promise<User> {
    const existingAccount = await this.prisma.githubAccount.findUnique({
      where: { githubId: profile.githubId },
      include: { user: true },
    });

    if (existingAccount) {
      return existingAccount.user;
    }

    return this.prisma.user.create({
      data: {
        nickname: profile.githubLogin,
        avatarUrl: profile.avatarUrl,
        githubAccount: {
          create: {
            githubId: profile.githubId,
            githubLogin: profile.githubLogin,
          },
        },
        userStats: {
          create: {},
        },
      },
    });
  }
}
