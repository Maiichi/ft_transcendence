import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ChatService } from './chat.service';
import { GetUser } from 'src/auth/decorator';
import { Response } from 'express';
import { User } from '@prisma/client';
import { MessageService } from './message/message.service';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController 
{
    constructor(
        private chatService:    ChatService,
        private messageService: MessageService
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

    // getUserRooms
    @Get('/rooms')
    async getUserRooms(@GetUser() user: User, @Res() res: Response)
    {
        try {
            return await this.messageService.getUserRooms(user, res);
        } catch (error) {
            console.log("controller level == " + error.message)
            res.send({error: error})
        }
    }
    
    // getConversation 2 user
    @Get('/:id/conversation')
    async getUserDirectConversation(@Param('id') conversationId: number ,@GetUser() sender: User, @Res() res: Response)
    {
        try {
            return await this.messageService.getUserDirectConversation(Number(conversationId) ,sender, res);
        } catch (error) {
            console.log("controller level == " + error.message)
            res.send({error: error})
        }
    }
    // getAllConversation

    // getRoomMessages
    // getRoomConversation
    @Get('/room/:id/conversation')
    async getRoomConversation(@Param('id') roomId: number, @GetUser() user: User, @Res() res: Response)
    {
        try {
            return await this.messageService.getRoomConversation(Number(roomId), user, res);
        } catch (error) {
            console.log("controller level == " + error.message)
            res.send({error: error.message})
        }
    }

    // updateRoom

    // deleteRoom

    // 
}
