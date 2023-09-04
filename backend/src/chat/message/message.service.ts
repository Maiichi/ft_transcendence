import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { WsException } from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Response } from 'express';
import { RoomService } from '../room/room.service';
import { ChatService } from '../chat.service';
import { SendMessageToRoomDto, SendMessageToUserDto } from './dto/handle.messages.dto';
import { BlacklistService } from 'src/user/blacklist/blacklist.service';


@Injectable()
export class MessageService
{
    constructor(
        private prisma:             PrismaService,
        private userService:        UserService,
        private chatService:        ChatService,
        private roomService:        RoomService,
        private blacklistService:   BlacklistService
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
        if (sender.intraId === receiver.intraId)
            throw new WsException(`you can't send a message to ur self`);
        // check if users are blocking each other
        const isBlockedByYou = await this.blacklistService.isBlockedByYou(sender.intraId, receiver.intraId);
        const isBlockingYou  = await this.blacklistService.isBlockingYou(sender.intraId, receiver.intraId);
        if (isBlockingYou)
            throw new WsException(`${receiver.userName} is Blocking you, you can't send him a message`);
        if (isBlockedByYou)
            throw new WsException(`${receiver.userName} is blocked by you, you can't send him a message`);
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
        if (!conversation)
            throw new NotFoundException(`no conversation found with id = ${conversationId}`);
        // find receiverId from conversation and check if they are blocking each others
        const participants = await this.prisma.conversation.findFirst({
            where : {
                id : conversationId
            },
            select : {
                participants : {
                    where : {
                        intraId : {
                            not : sender.intraId
                        }
                    }
                }
            }
        });
        const receiverId = participants.participants[0].intraId;
        const isBlockedByYou = await this.blacklistService.isBlockedByYou(sender.intraId, receiverId);
        const isBlockingYou  = await this.blacklistService.isBlockingYou(sender.intraId, receiverId);
        if (isBlockingYou)
            throw new WsException(`${receiverId} is Blocking you, you can't see the conversation`);
        if (isBlockedByYou)
            throw new WsException(`${receiverId} is blocked by you, you can't see the conversation`);
        const conversationMessages = await this.getConversationMessages(conversation.id);
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
        // console.log("room ==" + JSON.stringify(room))
        if (!room)
            throw new NotFoundException(`room Id ${roomId} does not exist`)
        const membership = await this.chatService.getMembership(user.intraId, room.id);
        if (!membership)
            throw new NotFoundException(`no membership between ${user.userName} and ${room.name}`);
        const roomConversation = await this.getRoomConversationById(roomId);
        if (!roomConversation)
            throw new NotFoundException("this room has no conversation yet");
        // getRoomParticipants
        const roomParticipants = await this.getRoomParticipants(room.id);
        console.log("room participants == " + JSON.stringify(roomParticipants));
        const userBlocked = await this.getBlackListByUserId(user.intraId);
        console.log("userBlocked = " + JSON.stringify(userBlocked));
        // console.log("User authenticated = " + user.intraId);
        const roomMessages = await this.getRoomMessages(roomConversation.id, user.intraId);
        // console.log("room Messages = " + JSON.stringify(roomMessages));
        return res.json({
            status: 200,
            data: roomMessages
        })
    }
   /********************************************************************************************************* */

   async getUserRooms(user: User, res: Response)
   {
       const rooms = await this.prisma.membership.findMany({
           where : {
               userId : user.intraId,
               isBanned: false,
           },
           select : {
                room : {
                    select : {
                        id: true,
                        conversation : true,
                        members: {
                            select: {
                                isAdmin: true,
                                isBanned: true,
                                isMute: true,
                                isOwner: true,
                                user: {
                                    select : {
                                        firstName: true,
                                        lastName: true,
                                        userName: true,
                                    }
                                }
                            }
                        },
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                        password: true,
                        type: true,
                    }
                },
           }
       });
    //    console.log("rooms ,", JSON.stringify(rooms))
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
        // if (!conversation)
        //         throw new NotFoundException(`no Convesation found with id = ${conversationId}`)
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
    //    if (!roomConversation)
    //        console.log("this room has no conversation")
       return roomConversation.conversation;
   }

    async getRoomMessages(conversationId: number, userId: number) {
        /*
        the where clause of the messages field's select option filters out messages 
            where the sender's blockedByMe or blockedMe lists contain a record with the corresponding user ID. 
            The none operator ensures that there are no records in the list that match the condition.
        This should prevent messages from blocked users from being displayed in the chat room.
        */
        const messages = await this.prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            select: {
                messages: {
                    where: {
                        sender: {
                            blockedByMe: {
                                none: {
                                    blockedById: userId,
                                },
                            },
                            blockedMe: {
                                none: {
                                    blockerById: userId,
                                },
                            },
                        },
                    },
                    select: {
                        id: true,
                        createdAt: true,
                        content: true,
                        chatId: true,
                        sender: {
                            select: {
                                userName: true,
                                firstName: true,
                                lastName: true,
                                avatar_url: true,
                                intraId: true
                            },
                        },
                    },
                },
            },
        });
        console.log("back: messages == ", JSON.stringify(messages));
        return messages;
    }

    async getRoomParticipants(roomId: number)
    {
        const participants = await this.prisma.room.findFirst({
            where: {
                id : roomId
            },
            include : {
                members : {
                    select : {
                        user : {
                            select :{
                                intraId: true
                            }
                        }
                    }
                }
            }
        });
        return participants.members;
    }

    async getBlackListByUserId(userId: number)
    {
        const getMyBlackList = await this.prisma.user.findMany({
            where : {
                intraId: userId
            },
            select: {
                blockedByMe : true,
                blockedMe: true
            }
        });
        return getMyBlackList;
    }
/***************************************** CONVERSATION  ***********************************************/

    async getUserDirectConversations(userId: number, res: Response)
    {
        const conversations = await this.prisma.user.findUnique({
            where : {
                intraId: userId
            },
            select : {
                conversations : {
                    where : {
                        type: 'direct',
                    },
                    select : {
                        id: true,
                        createdAt: true,
                        updatedAt: true,
                        type: true,
                        messages: {
                            select: {
                                content: true,
                                createdAt: true,
                            },
                            orderBy: {
                                createdAt: 'desc',
                            },
                            take: 1, // Retrieve only the last message
                        },
                        participants : {
                            where : {
                                NOT : {
                                    intraId : userId
                                }
                            },
                            select : {
                                userName: true,
                                firstName: true,
                                lastName: true,
                                status: true,
                            }
                        }
                    }
                }
            }
        });
        res.send({data: conversations});
    }
}