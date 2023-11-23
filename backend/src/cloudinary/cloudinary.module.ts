// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, PrismaService, UserService],
  exports: [CloudinaryProvider, CloudinaryService]
})
export class CloudinaryModule {}
