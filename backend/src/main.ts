import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(



    
    AppModule,
    { cors: true },
  );
  app.enableCors({
    origin: process.env.FRONTEND_URL, // Replace with your client's origin URL
    credentials: true,
  });
  // Enable CORS
  // app.use(cors({
  //   origin: ['http://localhost:3000', "https://api.intra.42.fr/"], // Set the allowed origin(s)
  //   credentials: true, // If you need to include cookies in the request
  // }));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Transcendence Manager API')
    .setDescription(
      'The Transcendence API description',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
  );
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();
