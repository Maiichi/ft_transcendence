import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController 
{
    constructor(
        private chatService: ChatService
    )
    {}
    // getRooms
    @Get('/rooms')
    async getRooms()
    {
        try {
            return this.chatService.getAllRooms();
        } catch (error) {
            const response = {
                success: false,
                message: error.message
            }
            return response;
        }
    }
    
    // getConversation 2 user

    // getAllConversation

    // getRoomMessages

    //getRoomMembers


    // updateRoom

    // deleteRoom

    // 
}
