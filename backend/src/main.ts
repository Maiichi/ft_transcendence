import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true
  }));
  // app.enableCors({
	// 	origin: ['https://api.intra.42.fr', 'http://localhost:3000'],
	// 	credentials: true,
	// });
  await app.listen(process.env.BACKEND_PORT || 5001);
}
bootstrap();
