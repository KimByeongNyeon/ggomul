import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug'] });
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    credentials: true, // 쿠키 전송을 위해 필수
  });
  app.use(cookieParser()); // req.cookies를 파싱할 수 있게 해주는 미들웨어
  app.setGlobalPrefix('api');
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`서버 실행 중: http://localhost:${port}`);
}
bootstrap();
