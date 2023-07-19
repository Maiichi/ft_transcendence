import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoomDto } from './dto/create.room.dto';
import { UserService } from 'src/user/user.service';
import { UpdateRoomDto } from './dto/update.room.dto';
import { WsException } from '@nestjs/websockets';
import { JoinRoomDto } from './dto/join.room.dto';
import { connect } from 'http2';

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


    /* DTO create
        {
            "name" : "riayda",
            "ownerId" : 90635,
            "type" : "private",
            "password" : "a74s"
        }
    */
    // function to create a new room
    async createRoom(createRoomDto: CreateRoomDto)
    {
        const {name, ownerId, type, password} = createRoomDto;
        const user = await this.userService.getUser(ownerId);
        console.log("user ==" + JSON.stringify(user));
        if(!user)
            throw new WsException(`userId = ${ownerId} does not exist !`);
        const roomExist = await this.getRoomByName(name);
        if (roomExist)
            throw new WsException(`room name ${name} already exist !`);
        if (type !== "public" && (!password?.length || password.length < 4))
                throw new WsException(`password must have at least 4 characters!`);
        if (type === "public" && password)
            throw new WsException(`public rooms shouldnt have a password !`);
        const newRoom = await this.prisma.room.create({
            data : {
                name : name,
                owner_id : user.intraId,
                password : password || "",
                type : type,
                admins: { connect: { intraId: user.intraId } },
                members: { connect: { intraId: user.intraId } },
            }
        });
        return newRoom;
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
        console.log("roomID == " + room.id);
        // Check if the user is an admin in the room
        const isAdmin = await this.prisma.room.findUnique({
            where: { id: room.id },
            select: { admins: { where: { intraId: userId } } },
        });
        console.log("admin == " + JSON.stringify(isAdmin));
        if (!isAdmin.admins.length) {
            throw new WsException(`User with intraId ${userId} is not an admin in the room`);
        }

        // check body data before persistence
        if (body.type !== "public" && (!body.password?.length || body.password.length < 4))
                throw new WsException(`password must have at least 4 characters!`);
        if (body.type === "public" && body.password)
            throw new WsException(`public rooms shouldnt have a password !`);
        const roomUpdate = await this.prisma.room.update({
            where: {id : room.id},
            data : {
                name: body.name,
                type: body.type,
                password: body.password || ""
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
        console.log("ROOM ==" + JSON.stringify(room));
        if (!room)
            throw new WsException(`room ${body.id} not found`);
        const isMember = await this.prisma.room.findUnique({
            where : {id: room.id},
            select: {members: { where: {intraId: userId}}}
        });
        if (isMember.members.length)
            throw new WsException(`user is already member on the room`);
        if (room.type === 'private' && !body.password)
            throw new WsException(`password of this room is missed !`);
        if (room.type == 'private' && body.password !== room.password)
            throw new WsException(`Password is incorrect`);
        const joinUser = await this.prisma.room.update({
            where: {id: room.id},
            data: {members : {connect: {intraId : userId}}}
        })
        console.log("userId =" + userId);
        console.log("join room service");
        return joinUser;
    }
}
