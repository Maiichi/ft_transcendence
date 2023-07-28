import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';
import { GetUser } from 'src/auth/decorator';
import { Response } from 'express';
import { User } from '@prisma/client';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController 
{
    constructor(
        private chatService: ChatService
    )
    {}
    // getRooms
    // @Get('/rooms')
    // async getRooms()
    // {
    //     try {
    //         return this.chatService.getAllRoomsInfos();
    //     } catch (error) {
    //         const response = {
    //             success: false,
    //             message: error.message
    //         }
    //         return response;
    //     }
    // }
    
    // getConversation 2 user
    @Get('/:id/conversation')
    async getUserDirectConversation(@Param('id') conversationId: number ,@GetUser() sender: User, @Res() res: Response)
    {
        try {
            return this.chatService.getUserDirectConversation(Number(conversationId) ,sender, res);
        } catch (error) {
            res.send({error: error})
            console.log("controller level == " + error.message)
        }
    }
    // getAllConversation

    // getRoomMessages

    //getRoomMembers


    // updateRoom

    // deleteRoom

    // 
}
