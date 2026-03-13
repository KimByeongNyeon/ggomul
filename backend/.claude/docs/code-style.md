# 코드 스타일 가이드

## 기본 설정

- **Formatter**: Prettier (`.prettierrc` 준수)
- **Linter**: ESLint (`eslint.config.mjs` 준수)
- **언어**: TypeScript strict 모드

---

## 네이밍 컨벤션

### 파일명
| 유형 | 패턴 | 예시 |
|------|------|------|
| 모듈 | `{domain}.module.ts` | `github.module.ts` |
| 컨트롤러 | `{domain}.controller.ts` | `dashboard.controller.ts` |
| Facade | `{domain}.facade.ts` | `dashboard.facade.ts` |
| 서비스 | `{domain}.service.ts` | `github.service.ts` |
| API 어댑터 | `{domain}.api.ts` | `github.api.ts` |
| 클라이언트 | `{domain}.client.ts` | `github.client.ts` |
| DTO (외부) | `{domain}-{resource}-dto.ts` | `github-user-dto.ts` |
| DTO (내부) | `{domain}.dto.ts` | `dashboard.dto.ts` |

### 클래스 / 인터페이스
- PascalCase 사용
- DTO: 접미사 `Dto` 또는 `Response` (예: `GithubUserDto`, `DashboardResponse`)
- Service: 접미사 `Service` (예: `GithubService`)
- Facade: 접미사 `Facade` (예: `DashboardFacade`)
- Api 어댑터: 접미사 `Api` (예: `GithubApi`)

### 변수 / 함수
- camelCase 사용
- 함수명은 동사로 시작 (예: `getStats`, `getLanguageStats`)
- boolean 변수는 `is`, `has`, `can` 접두사 (예: `isActive`)

### 상수
- `SCREAMING_SNAKE_CASE` (예: `GITHUB_TOKEN`, `GITHUB_CLIENT`)

---

## Import 규칙

- NestJS 내부 모듈 절대 경로 사용: `src/modules/...`
- 같은 모듈 내부: 상대 경로 사용 (`../dto/...`)

```typescript
// 다른 모듈 참조 - 절대 경로
import { GithubService } from 'src/modules/github/service/github.service';

// 같은 모듈 내부 - 상대 경로
import { GithubUserDto } from '../dto/github-user-dto';
```

---

## 에러 처리

NestJS 내장 예외 클래스만 사용한다. 직접 `Error`를 throw 하지 않는다.

```typescript
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

// 외부 API 에러 처리 패턴
try {
  const result = await this.someApi.getData();
  return result;
} catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    throw new NotFoundException('리소스를 찾을 수 없습니다.');
  }
  throw new InternalServerErrorException('API 호출 중 오류가 발생했습니다.');
}
```

### 에러 메시지
- 한국어로 작성
- 사용자가 이해할 수 있는 자연스러운 문장

---

## 비동기 처리

- `async/await` 사용 (`.then().catch()` 체이닝 지양)
- 병렬 처리가 가능한 경우 반드시 `Promise.all` 사용

```typescript
// 권장: 병렬 실행
const [stats, languages] = await Promise.all([
  this.githubService.getStats(username),
  this.githubService.getLanguageStats(username),
]);

// 지양: 순차 실행 (독립적인 요청임에도)
const stats = await this.githubService.getStats(username);
const languages = await this.githubService.getLanguageStats(username);
```

---

## NestJS 의존성 주입

- 생성자 주입 패턴 사용 (프로퍼티 주입 금지)
- `@Inject('TOKEN')` 은 커스텀 Provider(axios client 등)에만 사용

```typescript
@Injectable()
export class GithubService {
  constructor(private readonly githubApi: GithubApi) {}
}
```

---

## 주석

- 복잡한 비즈니스 로직에만 주석 작성 (자명한 코드에 주석 금지)
- 주석은 한국어로 작성
- 외부 API 어댑터 설계 의도처럼 아키텍처적 결정은 파일 상단에 블록 주석으로 설명

```typescript
/**
 * 서비스 내부에 외부 API 통신 로직을 넣지 않고 외부에 어댑터 계층을 두어
 * 외부 API에 서비스가 직접 의존하지 않도록 설계함
 */
@Injectable()
export class GithubService { ... }
```

---

## 금지 사항

- `any` 타입 사용 금지 (불가피한 경우 `unknown` + 타입 가드 사용)
- `console.log` 운영 코드에 남기기 금지
- Service에서 axios 직접 import 후 HTTP 호출 금지
- 미사용 import 남기기 금지
- 요청하지 않은 기능 추가, 리팩토링 금지
