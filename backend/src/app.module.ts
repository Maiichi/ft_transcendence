import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { multerConfig } from './user/multer/multer.config';
import { ChatModule } from './chat/chat.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // MulterModule.register(multerConfig),
    AuthModule,
    PrismaModule, UserModule, ChatModule, CloudinaryModule
  ],
  controllers: [UserController],
  providers : [UserService]
})
export class AppModule {}