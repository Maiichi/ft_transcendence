import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WsException } from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Response } from 'express';
import { RoomService } from '../room/room.service';
import { ChatService } from '../chat.service';
import { SendMessageToRoomDto, SendMessageToUserDto } from './dto/handle.messages.dto';


@Injectable()
export class MessageService
{
    constructor(
        private prisma:         PrismaService,
        private userService:    UserService,
        private chatService:    ChatService,
        private roomService:    RoomService
    ){}

    /********************************************* PRIVATE CONVERSATION ******************************************** */
    // function to send a private message to specific user
    /* 
        Send Message DTO
        {
            "receiverId" : 90682,
            "content" : "Hello i'm ishak"
        }
    */
   // TODO: need to check if the users block each other
   // TODO: need to check the body data (is id a string ...)
   async sendMessageToUser(body: SendMessageToUserDto, userId: number)
   {
       const sender = await this.userService.getUser(userId);
       if(!sender)
           throw new WsException(`(sender) userId = ${userId} does not exist !`);
       const receiver = await this.userService.getUser(body.receiverId);
       if (!receiver)
           throw new WsException(`(receiver) userId = ${body.receiverId} does not exist !`);
       // check if a user sends a message to him self
       // check if users are blocking each other

       // Check if a conversation already exists between the sender and receiver
       let conversation = await this.prisma.conversation.findFirst({
           where: {
               type: 'direct',
               participants: {
                   some: {
                       intraId: { in: [sender.intraId, receiver.intraId] },
                   },
               },
           },
       });

       // If a conversation doesn't exist, create a new one
       if (!conversation) 
       {
           conversation = await this.prisma.conversation.create({
               data: {
                   type: 'direct',
                   participants: {
                       connect: [
                           { intraId: sender.intraId }, // Connect the sender
                           { intraId: receiver.intraId }, // Connect the receiver
                       ],
                   },
               },
           });
       }

       // Create the new message and associate it with the sender, receiver, and conversation
       const message = await this.prisma.message.create({
           data: {
           content: body.content,
           sender: { connect: { intraId: sender.intraId } },
           chat: { connect: { id: conversation.id } },
           },
       });
       console.log(`${sender.userName} has sent this message : "${message.content}" , to ${receiver.userName}`)
       return message;
   }


   // getUserPrivateConversation
   async getUserDirectConversation(conversationId: number, sender: User, res: Response)
   {
       if (!sender)
           throw new NotFoundException(`This user does not exist`);
       const conversation = await this.getConversationById(conversationId);
       const conversationMessages = await this.getConversationMessages(conversation.id);
       console.log("messages == " + JSON.stringify(conversationMessages));
       return res.json({
           status: 200,
           data: conversationMessages
       });
   }

   /********************************************* ROOM CONVERSATION ******************************************** */

   /* function to send messages to a specific room */
   // TODO : need to add BLOCK system
   // {
   //     "roomId" : 3,
   //     "content" : "Hello i'm ishak"
   // }
   async sendMessageToRoom(body: SendMessageToRoomDto, userId: number)
   {
       const sender = await this.userService.getUser(userId);
       if(!sender)
           throw new WsException(`(sender) userId = ${userId} does not exist !`);
       const room = await this.roomService.getRoomById(body.roomId);
       // console.log("ROOM ==" + JSON.stringify(room));
       if (!room)
           throw new WsException(`room ${body.roomId} not found`);
       const membership = await this.chatService.getMembership(sender.intraId, room.id);
       if (!membership)
           throw new WsException(`no membership between ${sender.userName} and ${room.id}`);
       const isMuted = await this.roomService.isMuted(sender.intraId, room.id);
       if (isMuted)
           throw new WsException(`You're muted for ${membership.timeMute} please wait until it finishs`);
       // check block system
       let conversation = await this.prisma.conversation.findUnique({
           where: {
               type: 'channel',
               roomId: room.id,
           }
       });
       console.log("conversation == " + JSON.stringify(conversation));
       if (!conversation)
       {
           conversation = await this.prisma.conversation.create({
               data: {
                   type: 'channel',
                   participants: {
                       connect : {
                           intraId : sender.intraId
                       }
                   },
                   room: {
                       connect : {
                           id : room.id
                       }
                   }
               }
           })
       }
       conversation = await this.prisma.conversation.update({
           where: {
               id: conversation.id
           },
           data: {
               participants: {
                   connect : {
                       intraId : sender.intraId
                   }
               }
           }
       });
       const message = await this.prisma.message.create({
           data: {
               content: body.content,
               sender: { connect : {intraId : sender.intraId} },
               chat: { connect: {id: conversation.id }}
           }
       });
       console.log(`${sender.userName} has sent this message : "${message.content}" , to room ${room.name}`)
       return message;
   }

   // need to check BLOCK system
   async getRoomConversation(roomId: number, user: User, res: Response)
   {
       const room = await this.roomService.getRoomById(roomId);
       console.log("room Id ==" + JSON.stringify(room))
       if (!room)
           throw new NotFoundException(`room Id ${roomId} does not exist`)
       const membership = await this.chatService.getMembership(user.intraId, room.id);
       if (!membership)
           throw new NotFoundException(`no membership between ${user.intraId} and ${room.id}`);
       const roomConversation = await this.getRoomConversationById(roomId);
       const roomMessages = await this.getRoomMessages(roomConversation.id);
       return res.json({
           status: 200,
           data: roomMessages
       })
   }
   /********************************************************************************************************* */

   async getUserRooms(user: User, res: Response)
   {
       const rooms = await this.prisma.user.findMany({
           where : {
               intraId : user.intraId
           },
           select : {
               memberships : {
                   where : {
                      isBanned : false,
                   },
                   select: {
                       room: true,
                   }
               },
           }
       });
       return res.json({
           status: 200,
           data: rooms
       });
   }

   /***************************************** CONVERSATION FUNCTIONS  HELPERS ***********************************************/
   
   async getConversationById(conversationId: number)
   {   
       const conversation = this.prisma.conversation.findFirst({
           where: {
               id: conversationId
           }
       });
       if (!conversation)
           throw new NotFoundException(`no Convesation found with id = ${conversationId}`)
       return conversation;
   }

   async getConversationMessages(conversationId: number)
   {
       const messages = this.prisma.conversation.findFirst({
           where: {
               id: conversationId
           },
           select: {
               messages : true
           }
       });
       return messages;
   }

   /******************************************************************************************************************** */
   async getRoomConversationById(roomId: number)
   {
       const roomConversation = await this.prisma.room.findUnique({
           where: {
               id : roomId
           },
           select : {
               conversation : true
           }
       });
       if (!roomConversation)
           console.log("this room has no conversation")
       return roomConversation.conversation;
   }

   async getRoomMessages(conversationId: number)
   {
       // const userBlocked = await this.getUserBlocked();
       const messages = this.prisma.conversation.findUnique({
           where: {
               id: conversationId
           },
           select: {
               messages: true
           }
       });
       return messages;
   }
}