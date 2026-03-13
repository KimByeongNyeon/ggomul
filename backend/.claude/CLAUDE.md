# ggomool_back - Project Rules

## 프로젝트 개요

GitHub API + solved.ac(Baekjoon) API를 연결하여 개발자의 성장 지표를 시각화하는 대시보드 백엔드 서비스.

- **Runtime**: Node.js + NestJS v11
- **Language**: TypeScript
- **HTTP Client**: axios

## 핵심 규칙

### 1. 개발 워크플로우 (필수 준수)

모든 개발 작업은 반드시 아래 순서를 따른다. **승인 없이 코드 작성 금지.**

```
계획 수립 → 사용자 승인 → 개발 → 완료 후 검증
```

자세한 내용: [workflow.md](./docs/workflow.md)

### 2. 아키텍처 (DDD + Facade 패턴)

모듈 내부 레이어 구조를 반드시 준수한다.

```
Controller → Facade → Service → Infrastructure (Api/Client)
```

자세한 내용: [architecture.md](./docs/architecture.md)

### 3. 코드 스타일

NestJS 표준 컨벤션 + 프로젝트 고유 규칙을 따른다.

자세한 내용: [code-style.md](./docs/code-style.md)

## 디렉토리 구조

```
src/
  modules/
    {domain}/
      controller/     # HTTP 진입점
      facade/         # 서비스 조합 (cross-module 집계)
      service/        # 비즈니스 로직
      infrastructure/ # 외부 API 어댑터 (client, api)
      dto/            # 데이터 전송 객체
      {domain}.module.ts
```

## 세션 시작 시 체크

- [ ] 기존 아키텍처 레이어 구조 확인
- [ ] 기존 DTO 패턴 및 네이밍 확인
- [ ] 기존 에러 처리 방식 확인
- [ ] 작업 전 계획 수립 및 승인 요청
