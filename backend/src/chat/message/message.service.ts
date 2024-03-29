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
                    every: {
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
        const retreivedConversation = await this.getRetrivedConvesation(conversation.id, sender.intraId);
        return retreivedConversation;
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
       if (!room)
           throw new WsException(`room ${body.roomId} not found`);
       const membership = await this.chatService.getMembership(sender.intraId, room.id);
       if (!membership)
           throw new WsException(`no membership between ${sender.userName} and ${room.id}`);
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
       return message;
   }

   // need to check BLOCK system
    async getRoomConversation(roomId: number, user: User, res: Response)
    {
        const room = await this.roomService.getRoomById(roomId);
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
        const userBlocked = await this.getBlackListByUserId(user.intraId);
        const roomMessages = await this.getRoomMessages(roomConversation.id, user.intraId);
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
                        name: true,
                        type: true,
                        password: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
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
        return conversation;
   }


   async getConversationMessages(conversationId: number)
   {
        const messages = this.prisma.conversation.findFirst({
            where: {
                id: conversationId
            },
            select: {
                messages : {
                    select : {
                        id: true,
                        content: true,
                        createdAt: true,
                        sender : {
                            select : {
                                firstName: true,
                                lastName: true,
                                userName: true,
                                intraId: true,
                                avatar_url: true
                            }
                        }
                    }
                }
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

    async getUserDirectConversations(userId: number, res: Response) {
        const user = await this.prisma.user.findUnique({
            where: {
                intraId: userId,
            },
            select: {
                conversations: {
                    where: {
                        type: 'direct',
                    },
                    select: {
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
                        participants: {
                            where: {
                                NOT: {
                                    intraId: userId,
                                },
                                AND: [
                                    {
                                        NOT: {
                                            blockedMe: {
                                                some: {
                                                    blockerById: userId,
                                                },
                                            },
                                        },
                                    },
                                    {
                                        NOT: {
                                            blockedByMe: {
                                                some: {
                                                    blockedById: userId,
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            select: {
                                userName: true,
                                firstName: true,
                                lastName: true,
                                status: true,
                                avatar_url: true,
                                intraId: true,
                                inGame: true,
                                inQueue: true
                            },
                        },
                    },
                },
            },
        });
    
        const conversationsData = [];
        for (const conversation of user?.conversations || []) {
            if (conversation.messages[0]?.content && conversation.messages[0]?.createdAt && conversation.participants[0]?.intraId) {
                const conversationData = {
                    id: conversation.id,
                    createdAt: conversation.createdAt,
                    updatedAt: conversation.updatedAt,
                    type: conversation.type,
                    lastMessage: {
                        content: conversation.messages[0].content,
                        createdAt: conversation.messages[0].createdAt,
                    },
                    receiver: {
                        intraId: conversation.participants[0].intraId,
                        userName: conversation.participants[0].userName,
                        firstName: conversation.participants[0].firstName,
                        lastName: conversation.participants[0].lastName,
                        status: conversation.participants[0].status,
                        avatar_url: conversation.participants[0].avatar_url,
                        inGame: conversation.participants[0].inGame,
                        inQueue: conversation.participants[0].inQueue,
                    },
                };

                conversationsData.push(conversationData);
            }
        }

        return res.json({
            data: conversationsData,
        });
    }
    


    /********************* getRetrivedConvesation **********************/
    async getRetrivedConvesation(conversationId: number, senderId: number)
    {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                id: conversationId,
                type: 'direct'
            },
            select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    type: true,
                    messages: {
                        select: {
                            id: true,
                            content: true,
                            createdAt: true,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        take: 1, // Retrieve only the last message
                    },
            }
        });
        const conversationData = {
            id: conversation.id,
            createdAt: conversation.createdAt,
            updatedAt: conversation.updatedAt,
            type: conversation.type,
            lastMessage: {
                id: conversation.messages[0].id,
                content: conversation.messages[0].content,
                createdAt: conversation.messages[0].createdAt,
            }
        };
        return conversationData;
    }
}