import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create.room.dto';
import { UserService } from 'src/user/user.service';
import { UpdateRoomDto } from './dto/update.room.dto';
import { WsException } from '@nestjs/websockets';
import { JoinRoomDto } from './dto/join.room.dto';
import { verify , hash } from 'argon2'
import { addMinutes } from 'date-fns'
import { SetRoomAdminDto, KickMemberDto, MuteMemberDto, LeaveRoomDto } from './dto/update.user.membership.dto';
import { SendMessageToRoomDto, SendMessageToUserDto } from './dto/handle.messages.dto';
import { User } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class ChatService 
{
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) {}

    async getRoomById(roomId: number)
    {
        const room = await this.prisma.room.findUnique({
            where: {id : roomId}
        });
        if (!room)
            throw new WsException(`roomId ${roomId} does not exist`);
        return room;
    }

    // TODO : need to be refactored (remove trycatch block)
    async getRoomByName(roomName: string) 
    {
        try {
            const room = await this.prisma.room.findFirst({
                where : {name : roomName}
            });
            if (!room)
                return null;
            return room;
        } catch (error) {
            const response = {
                success: false,
                message: error.message
            };
            return response;
        }
    }

   
   // get All Rooms
   async getAllRooms()
    {
        try {
            const rooms = await this.prisma.room.findMany();
            if (!rooms.length)
            return 'no rooms exists';
            return rooms;
        } catch (error) {
            const response = {
                success: false,
                message: error.message
            }
            console.log(response);
            return response;
        }
    }
    
    // async getAllRoomsInfos()
    // {
    //     const rooms = await this.prisma.room.findMany({
    //         include : {
    //             members: {
    //                 select: {
    //                     intraId: true,
    //                     userName: true
    //                 }
    //             },
    //             admins: {
    //                 select: {
    //                     intraId: true,
    //                     userName: true
    //                 }
    //             }
    //         }
    //     });
    //     if (!rooms.length)
    //     throw new NotFoundException(`No rooms exist in the database`);
    //     return rooms;
    // }
    
     /* DTO create
        {
            "name" : "riayda",
            "ownerId" : 90635,
            "type" : "private",
            "password" : "a74s"
        }
    */
    // function to create a new room
    async createRoom(createRoomDto: CreateRoomDto, userId: number)
    {
        // try {
        const {name, type, password} = createRoomDto;
        if (!createRoomDto.name || !createRoomDto.type)
            throw new WsException(`name and type are required !`);
        const user = await this.userService.getUser(userId);
        if(!user)
            throw new WsException(`userId = ${userId} does not exist !`);
        // console.log("user ==" + JSON.stringify(user));
        const roomExist = await this.getRoomByName(name);
        if (roomExist)
            throw new WsException(`room name ${name} already exist !`);
        if (type !== "public" && (!password?.length || password.length < 4))
                throw new WsException(`password must have at least 4 characters!`);
        if (type === "public" && password)
            throw new WsException(`public rooms should not have a password !`);
        // const hashedPass: string | undefined = type === "private" && password ? await hash(password) : undefined;
        if (type == "private" && password)
            var hashedPass: string = await hash(password);
        const newRoom = await this.prisma.room.create({
            data : {
                name : name,
                password : hashedPass || "",
                type : type,
            }
        });
        // Step 2: Create the new membership entry
        await this.prisma.membership.create({
            data: {
                room: {
                    connect: {
                        id: newRoom.id,
                    },
                },
                user: {
                    connect: {
                        intraId: userId,
                    },
                },
                isOwner: true,
                isAdmin: true,
            },
        });
        console.log(`${user.userName} has created a ${newRoom.name} room`)
        return newRoom;
        // } catch (error) {
        //     console.log("error || " + error)
        // }
    }

    /* DTO update
        {
            "id" : 1,
            "name" : "kora2",
            "type" : "public"
        }
    */
    // update Room
    async updateRoomById(body: UpdateRoomDto, userId: number)
    {
        const room = await this.getRoomById(body.id);
        console.log("room Id ==" + JSON.stringify(room))
        if (!room)
            throw new WsException(`room Id ${body.id} does not exist`)

        // Check if the user is an admin in the room
        const isAdmin = await this.prisma.membership.findFirst({
            where : { 
                roomId: room.id, 
                userId: userId
            },
            select : {isAdmin : true},
        })
        console.log("isAdmin ==" + JSON.stringify(isAdmin));
        if (!isAdmin.isAdmin) {
            throw new WsException(`User with intraId ${userId} is not an admin in the room`);
        }
        // check body data before persistence
        if (body.type !== "public" && (!body.password?.length || body.password.length < 4))
                throw new WsException(`password must have at least 4 characters!`);
        if (body.type === "public" && body.password)
            throw new WsException(`public rooms shouldnt have a password !`);
        const hashedPass: string | undefined = body.type === "private" && body.password ? await hash(body.password) : "";
        const roomUpdate = await this.prisma.room.update({
            where: {id : room.id},
            data : {
                name: body.name,
                type: body.type,
                password: hashedPass
            }
        });
        console.log("room updated successfully")
        return roomUpdate;
    }

    /* DTO join
    {
        "id" : 1
    }
    */
    // join room
    // TODO: need to add the user to the room conversation
    async joinRoom(body: JoinRoomDto, userId: number)
    {
        if (!body.id)
            throw new WsException('id field is required !')
        const room = await this.getRoomById(body.id);
        // console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.id} not found`);
        const isMember = await this.isMember(userId, room.id)
        // console.log("isMem in join === " + isMember)
        if (isMember)
            throw new WsException(`user is already member on the room`);
        if (room.type === 'private' && !body.password)
            throw new WsException(`password is required for this room !`);
        if (room.type == 'private' && body.password)
        {
            const isMatch = await verify(room.password, body.password);
            if (!isMatch)
                throw new WsException(`Passwords don't matchs`);
        }
        const newMembership = await this.prisma.membership.create({
            data : {
                room: {
                    connect: {
                        id: room.id,
                    },
                },
                user: {
                    connect: {
                        intraId: userId,
                    },
                },
                isOwner: false,
                isAdmin: false,
                isBanned: false,
                isMute: false,
            }
        })
        // console.log("join room service");
        console.log(`${userId} has joined the room ${room.name}`)
        return newMembership;
    }

    /*
        leaveRoom JSON
        {
            "roomId" : 3,
        }
    */
    // function to leave a room
    // TODO: need to remove the user from the room conversation
    async leaveRoom(body: LeaveRoomDto, userId: number)
    {
        if (!body.roomId)
            throw new WsException('room Id is reauired !')
        const room = await this.getRoomById(body.roomId);
        const user = await this.userService.getUser(userId);
        if(!user)
            throw new WsException(`userId = ${userId} does not exist !`);
        // check if the user is already a member in this room
        // getMemberShip
        const membership = await this.getMembership(userId, room.id);
        if (!membership)
            throw new WsException (`no membership between ${userId} and ${room.id}`);
        const updatedMembership = await this.prisma.membership.delete({
            where: {
                id: membership.id
            }
        });

        console.log(`${user.userName} has left ${room.name} room`);
        return updatedMembership;
    }

    async setAdminToRoom(body: SetRoomAdminDto, userId: number)
    {
        if (!body.roomId || !body.userId)
            throw new WsException('roomId OR userId are missed !');
        const room = await this.getRoomById(body.roomId);
        // console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.roomId} not found`);
        // check if the user in the body exists
        const user = await this.userService.getUser(body.userId);
        // console.log("USER == " + JSON.stringify(user));
        if(!user)
                throw new WsException(`userId = ${body.userId} does not exist !`);
        // check if the user is who wants to set an admin is also an admin
        const isAdmin = await this.isAdmin(userId, room.id);
        if (!isAdmin)
            throw new WsException(`User with intraId ${userId} is not an admin in the room, so he can't set an admin`);
        // check if the user is already a member in this room
        // getMemberShip
        const membership = await this.getMembership(body.userId, room.id);
        if (!membership)
            throw new WsException (`no membership between ${body.userId} and ${room.id}`);
        // set new Admin
        const newAdmin = await this.prisma.membership.update({
            where: {
                id: membership.id
            },
            data :{
                isAdmin: true
            }
        })
        console.log("Admin setted successfully");
        return newAdmin;
    }

    // TODO: need improvement || need to remove the user kicked from the room conversation
    /*
        kick JSON
        {
            "userId" : 90682,
            "roomId" : 3,
        }
    */
    async kickMember(body: KickMemberDto, userId: number)
    {
        if (!body.roomId || !body.userId)
            throw new WsException('roomId or userId is missed !')
        const room = await this.getRoomById(body.roomId);
        // console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.roomId} not found`);
        // check if the user that will performs the kick exists
        const kicker = await this.userService.getUser(userId);
        if (!kicker)
            throw new WsException(`userId (kicker) = ${userId} does not exist !`);
        // check if the user that will be kicked is exists
        const user = await this.userService.getUser(body.userId);
        // console.log("USER == " + JSON.stringify(user));
        if(!user)
            throw new WsException(`userId = ${body.userId} does not exist !`);
        // check if the user that will be kicked is a member in the room or not
        const membership = await this.getMembership(body.userId, room.id);
        if (!membership)
            throw new WsException(`no membership between ${body.userId} and ${room.id}`);
         // check if the user that will performs the kick is an Admin
        const isAdmin = await this.isAdmin(userId, room.id);
        if (!isAdmin)
            throw new WsException(`User with intraId ${userId} is not an admin in the room, so he can't kick a member`);
        // check if the user that will be kicked is a the owner of the room
        // TODO : change isOwner to isAdmin
        const isOwner = await this.isOwner(body.userId, room.id);
        if (isOwner)
            throw new WsException(`You can't kick the owner of the room`)
        const updatedMembership = await this.prisma.membership.delete({
            where : {
                id: membership.id
            }
        })
        console.log(`${user.userName} has been kicked successfully from ${room.name}`);
        return updatedMembership;
    }

    async muteMember(userId: number, body: MuteMemberDto)
    {
        if (!body.roomId || !body.userId || !body.timeMute)
            throw new WsException('some fields are missed !!')
        const room = await this.getRoomById(body.roomId);
        // console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.roomId} not found`);
        const kicker = await this.userService.getUser(userId);
        if (!kicker)
            throw new WsException(`userId (kicker) = ${userId} does not exist !`);
        // check if the user in the body exists
        const user = await this.userService.getUser(body.userId);
        // console.log("USER == " + JSON.stringify(user));
        if(!user)
            throw new WsException(`userId = ${body.userId} does not exist !`);
        const membership = await this.getMembership(body.userId, room.id);
        if (!membership)
            throw new WsException(`no membership between ${body.userId} and ${room.id}`);
        // check if the user that will be muted is the owner of the room
        const isOwner = await this.isOwner(body.userId, room.id);
        if (isOwner)
            throw new WsException(`You can't mute the owner of the room`)
        const isMuted = await this.isMuted(body.userId, room.id);
        if (isMuted)
            throw new WsException(`This user is already muted. Wait until his muted time ends.`)
        // calculate time mute based on the DTO
        const now = new Date();
        const endMutedTime = addMinutes(now, body.timeMute);
        console.log("endMutedTime = " + endMutedTime);
        const updateMembership = await this.prisma.membership.update({
            where : {
                id: membership.id
            },
            data : {
                isMute: true,
                timeMute: endMutedTime
            }
        })
        console.log("User muted successfully");
        return updateMembership;
    }


    // async unSetAdminOfRoom(body: SetRoomAdmin, userId: number)
    // {
    //     const room = await this.getRoomById(body.roomId);
    //     // console.log("ROOM ==" + JSON.stringify(room));
    //     if (!room)
    //         throw new WsException(`room ${body.roomId} not found`);
    //     // check if the user in the body exists
    //     const user = await this.userService.getUser(body.userId);
    //     // console.log("USER == " + JSON.stringify(user));
    //     if(!user)
    //             throw new WsException(`userId = ${body.userId} does not exist !`);
    //     const isAdmin = await this.isAdmin(body.userId, room.id);
    //     if (!isAdmin) {
    //         throw new WsException(`User with intraId ${userId} is not an admin in the room, so he can't be unsetted`);
    //     }
    //     // check if the user is already a member in this room
    //     const isMember = await this.isMember(body.userId, room.id)
    //     if (!isMember)
    //         throw new WsException(`User id ${body.userId} not in the room`);
    // }

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
        const room = await this.getRoomById(body.roomId);
        // console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.roomId} not found`);
        const membership = await this.getMembership(sender.intraId, room.id);
        if (!membership)
            throw new WsException(`no membership between ${sender.userName} and ${room.id}`);
        const isMuted = await this.isMuted(sender.intraId, room.id);
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
        const room = await this.getRoomById(roomId);
        console.log("room Id ==" + JSON.stringify(room))
        if (!room)
            throw new NotFoundException(`room Id ${roomId} does not exist`)
        const membership = await this.getMembership(user.intraId, room.id);
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

    /********************************************************************************************************* */
    // isOwner
    async isOwner(userId: number, roomId: number)
    {
        const isOwner = await this.prisma.membership.findFirst({
            where : {
                userId: userId,
                roomId: roomId
            },
            select : {
                isOwner: true
            }
        });
        return isOwner.isOwner;
    }

    // isAdmin
    async isAdmin(userId: number, roomId: number)
    {
        const isAdmin = await this.prisma.membership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
            select : {
                isAdmin: true
            }
        })
        return isAdmin.isAdmin;
    }

    // isMember
    async isMember(userId: number, roomId: number)
    {
        const isMember = await this.prisma.room.findFirst({
            where : {
                id: roomId,
                members:{
                    some : {
                        userId : userId
                    }
                }
            },
        })
        return isMember ? true : false;
    }
    // isMuted
    async isMuted(userId: number, roomId: number)
    {
        const isMuted = await this.prisma.membership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
            select : {
                isMute: true
            }
        })
        
        return isMuted.isMute;
    }
    // isBanned
    async isBanned(userId: number, roomId: number)
    {
        const isBanned = await this.prisma.membership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
            select : {
                isBanned: true
            }
        })
        return isBanned.isBanned;
    }
    // getMembership
    async getMembership(userId: number, roomId: number)
    {
        const memberShip = await this.prisma.membership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
        })
        return memberShip 
    }
    /********************************************************************************************************* */

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
    /******************************************************************************************************************** */

}
