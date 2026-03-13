# 아키텍처 가이드

## 패턴: DDD + Facade

도메인별 모듈로 분리하고, 복수의 도메인 서비스를 조합할 때 Facade를 사용한다.

---

## 레이어 구조 및 의존 방향

```
[HTTP 요청]
     ↓
Controller          # 라우팅만 담당, 비즈니스 로직 없음
     ↓
Facade              # 여러 Service를 조합하여 응답 구성
     ↓
Service             # 도메인 비즈니스 로직
     ↓
Infrastructure      # 외부 API 어댑터 (Api 클래스, Client Provider)
     ↓
[외부 API]
```

### 의존 방향 규칙
- 상위 레이어 → 하위 레이어 방향으로만 의존
- Service가 다른 모듈의 Service를 직접 호출하지 않는다 (Facade를 통해 조합)
- Infrastructure가 Service를 참조하지 않는다

---

## 각 레이어 역할

### Controller (`controller/`)
- NestJS `@Controller`, `@Get`, `@Post` 등 데코레이터 사용
- Facade 또는 Service를 주입받아 호출하고 결과를 반환
- 비즈니스 로직 작성 금지

```typescript
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardFacade: DashboardFacade) {}

  @Get(':username')
  getDashboard(@Param('username') username: string) {
    return this.dashboardFacade.getDashboard(username);
  }
}
```

### Facade (`facade/`)
- 복수 Service를 조합하여 단일 응답 구성
- `Promise.all`로 병렬 호출하여 성능 최적화
- 단일 Service만 사용하는 경우에도 cross-module 집계라면 Facade 사용

```typescript
@Injectable()
export class DashboardFacade {
  constructor(private readonly githubService: GithubService) {}

  async getDashboard(username: string): Promise<DashboardResponse> {
    const [stats, languages, contributions] = await Promise.all([
      this.githubService.getStats(username),
      this.githubService.getLanguageStats(username),
      this.githubService.getContributionStats(username),
    ]);
    return { github: { stats, languages, contributions } };
  }
}
```

### Service (`service/`)
- 도메인 비즈니스 로직 담당
- Infrastructure(Api)를 주입받아 외부 데이터 획득
- 외부 API 직접 호출 금지 (axios를 서비스에서 직접 import하지 않는다)
- 에러 핸들링: `NotFoundException`, `InternalServerErrorException` 사용

```typescript
@Injectable()
export class GithubService {
  constructor(private readonly githubApi: GithubApi) {}

  async getStats(username: string): Promise<GithubStats> {
    try {
      const user = await this.githubApi.getUser(username);
      return { login: user.login, repoCount: user.public_repos, followers: user.followers };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new NotFoundException('유저를 찾을 수 없습니다.');
      }
      throw new InternalServerErrorException('API 호출 중 오류가 발생했습니다.');
    }
  }
}
```

### Infrastructure (`infrastructure/`)

두 파일로 구성:

**`{domain}.client.ts`** - axios 인스턴스를 NestJS Provider로 등록
```typescript
export const githubClientProvider = {
  provide: 'GITHUB_CLIENT',
  useFactory: (configService: ConfigService) => {
    return axios.create({ baseURL: '...', headers: { ... } });
  },
  inject: [ConfigService],
};
```

**`{domain}.api.ts`** - 실제 API 호출 메서드 모음 (어댑터 역할)
```typescript
@Injectable()
export class GithubApi {
  constructor(@Inject('GITHUB_CLIENT') private readonly githubClient: AxiosInstance) {}

  async getUser(username: string): Promise<GithubUserDto> {
    const res = await this.githubClient.get<GithubUserDto>(`/users/${username}`);
    return res.data;
  }
}
```

### DTO (`dto/`)
- 외부 API 응답 타입: `{domain}-{resource}-dto.ts` (예: `github-user-dto.ts`)
- 내부 응답 타입: `{domain}.dto.ts` (예: `dashboard.dto.ts`)
- class 또는 interface 사용 (NestJS 파이프 없으면 interface 선호)

---

## 모듈 구성

```
src/modules/
  github/
    controller/
    service/          github.service.ts
    infrastructure/   github.client.ts, github.api.ts
    dto/              github-user-dto.ts, github-repo-dto.ts, ...
    github.module.ts

  baekjoon/           (solved.ac API)
    ...
    baekjoon.module.ts

  user/
    ...
    user.module.ts

  dashboard/          (집계 모듈 - Facade 사용)
    controller/       dashboard.controller.ts
    facade/           dashboard.facade.ts
    service/          dashboard.service.ts
    dto/              dashboard.dto.ts
    dashboard.module.ts
```

---

## 새 도메인 추가 시 체크리스트

- [ ] 모듈 폴더 생성 (`src/modules/{domain}/`)
- [ ] Client Provider 작성 (`infrastructure/{domain}.client.ts`)
- [ ] Api 어댑터 작성 (`infrastructure/{domain}.api.ts`)
- [ ] Service 작성 (`service/{domain}.service.ts`)
- [ ] DTO 정의 (`dto/`)
- [ ] Module 파일 작성 및 `app.module.ts`에 등록
- [ ] 대시보드 집계가 필요하면 `DashboardFacade`에 추가
