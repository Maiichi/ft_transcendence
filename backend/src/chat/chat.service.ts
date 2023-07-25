import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create.room.dto';
import { UserService } from 'src/user/user.service';
import { UpdateRoomDto } from './dto/update.room.dto';
import { WsException } from '@nestjs/websockets';
import { JoinRoomDto } from './dto/join.room.dto';
import { verify , hash } from 'argon2'
import { SetRoomAdmin, kickMember } from './dto/update.user.membership.dto';
import { error } from 'console';

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
            throw new NotFoundException(`roomId ${roomId} does not exist`);
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
        try {
            const {name, type, password} = createRoomDto;
            const user = await this.userService.getUser(userId);
            if(!user)
                throw new WsException(`userId = ${userId} does not exist !`);
            console.log("user ==" + JSON.stringify(user));
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
            // Step 2: Create the new RoomMembership entry
            await this.prisma.roomMembership.create({
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
            return newRoom;
        } catch (error) {
            console.log("error || " + error)
        }
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
        const isAdmin = await this.prisma.roomMembership.findFirst({
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
        return roomUpdate;
    }

    /* DTO join
    {
        "id" : 1
    }
    */
    // join room
    async joinRoom(body: JoinRoomDto, userId: number)
    {
        const room = await this.getRoomById(body.id);
        // console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.id} not found`);
        const isMember = await this.isMember(userId, room.id)
        if (isMember)
            throw new WsException(`user is already member on the room`);
        if (room.type === 'private' && !body.password)
            throw new WsException(`password of this room is missed !`);
        if (room.type == 'private' && body.password)
        {
            const isMatch = await verify(room.password, body.password);
            if (!isMatch)
                throw new WsException(`Passwords don't matchs`);
        }
        const newMembership = await this.prisma.roomMembership.create({
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
        console.log("join room service");
        return newMembership;
    }

    async setAdminToRoom(body: SetRoomAdmin, userId: number)
    {
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
        if (!isAdmin) {
            throw new WsException(`User with intraId ${userId} is not an admin in the room, so he can't set an admin`);
        } 
        // check if the user is already a member in this room
        const isMember = await this.isMember(body.userId, room.id)
        if (!isMember)
            throw new WsException(`User id ${body.userId} not in the room`);
        // getMemberShip
        const membership = await this.getMembership(body.userId, room.id);
        if (!membership)
            throw new error (`no membership between ${body.userId} and ${room.id}`);
        // set new Admin
        const newAdmin = await this.prisma.roomMembership.update({
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

    // TODO: need improvement
    async kickMember(body: kickMember, userId: number)
    {
        const room = await this.getRoomById(body.roomId);
        // console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.roomId} not found`);
        // check if the user in the body exists
        const user = await this.userService.getUser(body.userId);
        // console.log("USER == " + JSON.stringify(user));
        if(!user)
            throw new WsException(`userId = ${body.userId} does not exist !`);
    
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

    // isAdmin
    async isAdmin(userId: number, roomId: number)
    {
        const check = await this.prisma.roomMembership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
            select : {
                isAdmin: true
            }
        })
        return check ? true : false;
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
        const isMuted = await this.prisma.roomMembership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
            select : {
                isMute: true
            }
        })
        return isMuted ? true : false;
    }
    // isBanned
    async isBanned(userId: number, roomId: number)
    {
        const isBanned = await this.prisma.roomMembership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
            select : {
                isBanned: true
            }
        })
        return isBanned ? true : false;
    }
    // getMembership
    async getMembership(userId: number, roomId: number)
    {
        const memberShip = await this.prisma.roomMembership.findFirst({
            where: {
                userId: userId,
                roomId: roomId
            },
        })
        return memberShip 
    }
}
