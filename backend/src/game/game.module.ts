import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GameController } from './game.controller';

@Module({
  providers: [GameGateway, GameService, UserService, JwtService],
  controllers: [GameController]
})
export class GameModule {}
