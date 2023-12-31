import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { GameController } from './game.controller';
import { BlacklistService } from 'src/user/blacklist/blacklist.service';

@Module({
  providers: [GameGateway, GameService, UserService, JwtService, BlacklistService],
  controllers: [GameController]
})
export class GameModule {}
