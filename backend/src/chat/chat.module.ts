import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
import { ChatGateway } from './gateways/chat.gateway';
import { JwtService } from '@nestjs/jwt';
import { BlacklistService } from 'src/user/blacklist/blacklist.service';
import { RoomService } from './room/room.service';
import { FriendService } from 'src/user/friend/friend.service';
import { MessageService } from "src/chat/message/message.service";
import { GameService } from 'src/game/game.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, UserService, JwtService ,ChatGateway, BlacklistService, RoomService, FriendService, MessageService, GameService]
})
export class ChatModule {}
