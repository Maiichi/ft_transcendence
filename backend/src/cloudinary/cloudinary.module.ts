// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [CloudinaryProvider, PrismaService, UserService],
  exports: [CloudinaryProvider]
})
export class CloudinaryModule {}
