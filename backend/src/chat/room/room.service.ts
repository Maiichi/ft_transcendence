import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { addMinutes } from 'date-fns';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ChatService } from '../chat.service';
import {
  MuteMemberDto,
  KickMemberDto,
  LeaveRoomDto,
  JoinRoomDto,
  SetRoomAdminDto,
  AddUserToRoomDto,
  BanUserFromRoom,
} from './dto/membership.dto';
import {
  CreateRoomDto,
  UpdateRoomDto,
} from './dto/room.dto';
import { User } from '@prisma/client';
import { Response } from 'express';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private chatService: ChatService,
  ) {}

  async getRoomById(roomId: number) {
    const room =
      await this.prisma.room.findUnique({
        where: { id: roomId },
        select: {
          id: true,
          name: true,
          password: true,
          type: true,
          members: {
            select: {
              user: {
                select: {
                  avatar_url: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
    if (!room)
      throw new WsException(
        `roomId ${roomId} does not exist`,
      );
    return room;
  }

  // TODO : need to be refactored (remove trycatch block)
  async getRoomByName(roomName: string) {
    const room = await this.prisma.room.findFirst(
      {
        where: { name: roomName },
      },
    );
    return room;
  }

  // get All Rooms excluding the channels where the currentUser 'userId' is banned from.
  // currentUser is the user who perform the action.
  async getAllRooms(userId: number) {
    try {

        const rooms = await this.prisma.room.findMany({
            where: {
                type: { not: 'private' },
                members: {
                  none: {
                    AND : [
                      {
                        userId: userId,
                      },
                      {
                        isBanned : true
                      }
                    ]
                  },
                },
            },
            include: {
                members: {
                    select: {
                        user: {
                            select: {
                                avatar_url: true,
                                intraId: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (!rooms.length) return [];

        return rooms;
    } catch (error) {
        const response = {
            success: false,
            message: error.message,
        };
        return response;
    }
}


  // get the rooms where the current user is member in
  async getUserRooms(user: User, res: Response) {
    try {
      const rooms =
        await this.prisma.user.findMany({
          where: {
            intraId: user.intraId,
          },
          select: {
            memberships: {
              where: {
                isBanned: false,
              },
              select: {
                room: true,
              },
            },
          },
        });
    } catch (error) {}
  }

  async getRoomUsersExcludingSender(
    roomId: number,
    userIdExcluded: number,
  ) {
    const roomUsers =
      await this.prisma.room.findMany({
        where: {
          id: roomId,
          members: {
            some: {
              user: {
                NOT: {
                  intraId: userIdExcluded,
                },
              },
            },
          },
        },
        select: {
          members: {
            where: {
              isBanned: false,
            },
            select: {
              user: {
                select: {
                  intraId: true,
                  userName: true,
                  avatar_url: true,
                },
              },
            },
          },
        },
      });
    if (roomUsers.length == 0) return [];

    // Extract the desired data structure using map
    const transformedUsers =
      roomUsers[0].members.map((member) => ({
        intraId: member.user.intraId,
        userName: member.user.userName,
      }));

    return transformedUsers;
    // return roomUsers;
  }
  async getRoomUsers(roomId: number) {
    const roomUsers =
      await this.prisma.room.findMany({
        where: {
          id: roomId,
        },
        select: {
          members: {
            where: {
              isBanned: false,
            },
            select: {
              user: {
                select: {
                  intraId: true,
                  userName: true,
                  avatar_url: true,
                },
              },
            },
          },
        },
      });
    if (roomUsers.length == 0) return [];

    // Extract the desired data structure using map
    const transformedUsers =
      roomUsers[0].members.map((member) => ({
        intraId: member.user.intraId,
        userName: member.user.userName,
      }));

    return transformedUsers;
    // return roomUsers;
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
  async createRoom(
    createRoomDto: CreateRoomDto,
    userId: number,
  ) {
    // try {
    const { name, type, password, description } =
      createRoomDto;
    if (
      !createRoomDto.name ||
      !createRoomDto.type
    )
      throw new WsException(
        `name and type are required !`,
      );
    const user =
      await this.userService.getUser(userId);
    if (!user)
      throw new WsException(
        `userId = ${userId} does not exist !`,
      );
    const roomExist =
      await this.getRoomByName(name);
    if (roomExist)
      throw new WsException(
        `Room name ${name} already exist !`,
      );
    if (
      type === 'protected' &&
      (!password?.length || password.length < 4)
    )
      throw new WsException(
        `Password must have at least 4 characters!`,
      );
    if (
      (type === 'public' || type == 'private') &&
      password
    )
      throw new WsException(
        `Only protected rooms, that should have a password !`,
      );
    // const hashedPass: string | undefined = type === "private" && password ? await hash(password) : undefined;
    if (type == 'protected' && password)
      var hashedPass: string =
        await hash(password);

    const newRoom = await this.prisma.room.create(
      {
        data: {
          name: name,
          description: description,
          password: hashedPass,
          type: type,
        },
      },
    );
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

    // step 3 : create a new conversation entry
    await this.prisma.conversation.create({
      data: {
        type: 'channel',
        room: {
          connect: {
            id: newRoom.id,
          },
        },
      },
    });
    const roomCreated =
      await this.prisma.room.findUnique({
        where: {
          id: newRoom.id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          type: true,
          password: true,
          members: {
            select: {
              user: {
                select: {
                  avatar_url: true,
                  intraId: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
    // retrive the room created
    const retrivedRoom =
      await this.chatService.getRoom(newRoom.id);
    return {
      dataMembership: retrivedRoom,
      dataRoom: roomCreated,
    };
  }

  /* DTO update
        {
            "id" : 1,
            "name" : "kora2",
            "type" : "public"
        }
    */
  // update Room
  // TODO: need to be checked concerning the optional fields ( password and description)
  async updateRoomById(
    body: UpdateRoomDto,
    userId: number,
  ) {
    if (!body.name)
      throw new WsException(`name field is required !`);

    const room = await this.getRoomById(body.id);
    if (!room)
      throw new WsException(`room Id ${body.id} does not exist`);

    // Check if the user is an admin in the room
    const isAdmin = await this.isAdmin(userId,room.id);
    if (!isAdmin) {
      throw new WsException(
        `User with intraId ${userId} is not an admin in the room`,
      );
    }
    const roomExist =
      await this.getRoomByName(body.name);
    if (roomExist && room.name != body.name)
      throw new WsException(
        `Room name ${body.name} already exist !`,
      );
    // check body data before persistence
    if (
      body.type === 'protected' &&
      (!body.password?.length ||
        body.password.length < 4)
    )
      throw new WsException(
        `password must have at least 4 characters!`,
      );
    if (body.type !== 'protected' && body.password)
      throw new WsException(
        `only the protected rooms that should have a password !`,
      );
    const hashedPass: string | undefined =
      body.type === 'protected' && body.password
        ? await hash(body.password)
        : null;
    const roomUpdate =
      await this.prisma.room.update({
        where: { id: room.id },
        data: {
          name: body.name,
          type: body.type,
          description: body.description,
          password: hashedPass,
        },
      });
    return roomUpdate;
  }

  /* DTO join
    {
        "id" : 1
    }
    */
  // join room
  // TODO: need to add the user to the room conversation || done
  async joinRoom(
    body: JoinRoomDto,
    userId: number,
  ) {
    if (!body.id)
      throw new WsException(
        'id field is required !',
      );
    const room = await this.getRoomById(body.id);
    if (!room)
      throw new WsException(
        `room ${body.id} not found`,
      );
    const isMember = await this.isMember(
      userId,
      room.id,
    );
    if (isMember)
      throw new WsException(
        `user is already member on the room`,
      );
    if (room.type === 'protected' && !body.password)
      throw new WsException(
        `password is required for this room !`,
      );
    if (room.type == 'protected' && body.password) {
      const isMatch = await verify(
        room.password,
        body.password,
      );
      if (!isMatch)
        throw new WsException(
          `Passwords don't matchs`,
        );
    }
    await this.prisma.membership.create({
      data: {
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
      },
    });

    
    // TODO : need to check
    const joinedRoom =
      await this.prisma.room.findUnique({
        where: {
          id: room.id,
        },
        select: {
          id: true,
          name: true,
          type: true,
          password: true,
          members: {
            select: {
              id: true,
              isAdmin: true,
              isBanned: true,
              isMute: true,
              isOwner: true,
              timeMute: true,
              user: {
                select: {
                  avatar_url: true,
                  firstName: true,
                  lastName: true,
                  userName: true,
                  intraId: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
    // retrive the room created
    const retrivedRoom =
      await this.chatService.getRoom(room.id);
    return {
      dataMembership: retrivedRoom,
      dataRoom: joinedRoom,
    };
  }

  /*
        leaveRoom JSON
        {
            "roomId" : 3,
        }
    */
  // function to leave a room
  // TODO: need to remove the user from the room conversation
  async leaveRoom(
    body: LeaveRoomDto,
    userId: number,
  ) {
    if (!body.roomId)
      throw new WsException(
        'room Id is required !',
      );
    const room = await this.getRoomById(
      body.roomId,
    );
    const user =
      await this.userService.getUser(userId);
    if (!user)
      throw new WsException(
        `userId = ${userId} does not exist !`,
      );
    // check if the user is already a member in this room
    // getMemberShip
    const membership =
      await this.chatService.getMembership(
        userId,
        room.id,
      );
    if (!membership)
      throw new WsException(
        `no membership between ${userId} and ${room.id}`,
      );
    const updatedMembership =
      await this.prisma.membership.delete({
        where: {
          id: membership.id,
        },
      });

    return updatedMembership;
  }

  async setAdminToRoom(
    body: SetRoomAdminDto,
    userId: number,
  ) {
    if (!body.roomId || !body.userId)
      throw new WsException(
        'roomId OR userId are missed !',
      );
    const room = await this.getRoomById(
      body.roomId,
    );
    if (!room)
      throw new WsException(
        `room ${body.roomId} not found`,
      );
    // check if the user in the body exists
    const user = await this.userService.getUser(
      body.userId,
    );
    if (!user)
      throw new WsException(
        `userId = ${body.userId} does not exist !`,
      );
    // check if the user is who wants to set an admin is the owner
    const isOwner = await this.isOwner(
      userId,
      room.id,
    );
    if (!isOwner)
      throw new WsException(
        `${user.firstName} ${user.lastName} is not the owner of the room, so he can't set an admin`,
      );
    // check if the user is already a member in this room
    // getMemberShip
    const membership =
      await this.chatService.getMembership(
        body.userId,
        room.id,
      );
    if (!membership)
      throw new WsException(
        `no membership between ${body.userId} and ${room.id}`,
      );

      // check if the user is banned 
      const isBanned = await this.isBanned(body.userId, room.id);
      if (isBanned)
        throw new WsException(`${user.firstName} ${user.lastName} is banned , he can't be setted as admin`);
    // set new Admin

      await this.prisma.membership.update({
        where: {
          id: membership.id,
        },
        data: {
          isAdmin: true,
        },
      });
    return {roomId: room.id, userId: user.intraId};
  }

  // TODO: need improvement || need to remove the user kicked from the room conversation
  /*
        kick JSON
        {
            "userId" : 90682,
            "roomId" : 3,
        }
    */
  async kickMember(body: KickMemberDto,adminId: number) 
  {
    const {userId, roomId} = body
    if (!body)
      throw new WsException('roomId or userId is missed !');
    const room = await this.getRoomById(roomId);
    if (!room)
      throw new WsException(`room ${roomId} not found`);
    // check if the user that will performs the kick exists
    const kicker = await this.userService.getUser(adminId);
    if (!kicker)
      throw new WsException(`adminId (kicker) = ${adminId} does not exist !`);
    // check if the user that will be kicked is exists
    const user = await this.userService.getUser(userId);
    if (!user)
      throw new WsException(`userId = ${body.userId} does not exist !`);
    // check if the user that will be kicked is a member in the room or not
    const membership = await this.chatService.getMembership(userId,roomId);
    if (!membership)
      throw new WsException(`no membership between ${userId} and ${roomId}`);
    // check if the user that will performs the kick is an Admin
    const isAdmin = await this.isAdmin(adminId,roomId);
    if (!isAdmin)
      throw new WsException(`User with intraId ${adminId} is not an admin in the room, so he can't kick a member`);
    //check if an admin wants to kick another admin
    const isKickedAdmin = await this.isAdmin(userId, roomId);
    if (isKickedAdmin && isAdmin)
      throw new WsException(`An admin can't kick another admin`);
      // check if the user that will be kicked is the owner of the room
    // TODO : change isOwner to isAdmin
    const isOwner = await this.isOwner(userId,roomId);
    if (isOwner)
      throw new WsException(`You can't kick the owner of the room`);

    await this.prisma.membership.delete({
      where: {
        id: membership.id,
      },
    });
    return {
      roomId: roomId,
      userId: userId
    };
  }

  async muteMember(adminId: number, body: MuteMemberDto) {
    const {roomId, userId, timeMute} = body
    if (!body)
      throw new WsException('some fields are missed !!');
    const room = await this.getRoomById(roomId);
    if (!room)
      throw new WsException(`room ${roomId} not found`);
    const muter =
      await this.userService.getUser(adminId);
    if (!muter)
      throw new WsException(`adminId (muter) = ${adminId} does not exist !`);
    // check if the user in the body exists
    const user = await this.userService.getUser(userId);
    if (!user)
      throw new WsException(`userId = ${body.userId} does not exist !`);
    const membership = await this.chatService.getMembership(userId,room.id);
    if (!membership)
      throw new WsException(`no membership between ${body.userId} and ${room.id}`);
    const isOwner = await this.isOwner(body.userId, room.id);
    if (isOwner)
      throw new WsException(`You can't mute the owner of the room`);
    const isMuterAdmin = await this.isAdmin(adminId, roomId);
    if (!isMuterAdmin)
      throw new WsException('only admins and owner who can mute users from rooms');
    const isMutedAdmin = await this.isAdmin(userId, roomId);
    if (isMutedAdmin && isMuterAdmin)
      throw new WsException(`An admin can't mute another admin`);
    // check if the user that will be muted is the owner of the room
    

    const now = new Date();
    const isMuted = await this.isMuted(now ,membership.timeMute);
    if (isMuted)
      throw new WsException(`This user is already muted. Wait until his muted time ends.`);
    // calculate time mute based on the DTO 
    // i have added 60 for the GMT+1
    const endMutedTime = addMinutes(now,timeMute + 60);
    await this.prisma.membership.update({
        where: {
          id: membership.id,
        },
        data: {
          timeMute: endMutedTime,
        },
      });
    return ({
      roomId: roomId,
      userId: userId,
      timeMute: timeMute
    });
  }
  

  async banMember(adminId: number, body: BanUserFromRoom)
  { 
      const {roomId, userId} = body;
      if (!body) 
        throw new WsException('roomId & bannedUserId field are required !');
      const room = await this.getRoomById(roomId);
      const user = await this.userService.getUser(userId);
      if (!user) 
        throw new WsException(`userId = ${userId} does not exist !`);
      const isAdmin = await this.isAdmin(adminId, room.id);
      if (!isAdmin) 
        throw new WsException('only admins who can ban users from rooms');
      const isBannedAdmin = await this.isAdmin(userId, roomId);
      if (isAdmin && isBannedAdmin)
        throw new WsException(`An admin can't ban another admin`);
      const isOwner = await this.isOwner(userId,roomId);
      if (isOwner)
        throw new WsException(`You can't ban the room owner ${user.userName}`);
      const membership = await this.chatService.getMembership(userId,roomId);
      if (!membership)
        throw new WsException(`no membership between ${userId} and ${roomId}`);
      await this.prisma.membership.update({
        where: {
          id: membership.id
        },
        data: {
          isBanned : true,
        }
      });
      return ({roomId: roomId, userId: userId});

  }
  async unBanMember(adminId: number, body: BanUserFromRoom)
  { 
      const {roomId, userId} = body;
      if (!body) 
        throw new WsException('roomId & bannedUserId field are required !');
      const room = await this.getRoomById(roomId);
      const user = await this.userService.getUser(userId);
      if (!user) 
        throw new WsException(`userId = ${userId} does not exist !`);
      const isAdmin = await this.isAdmin(adminId, room.id);
      if (!isAdmin) 
        throw new WsException('only admins who can unBan users from rooms');
      const isBannedAdmin = await this.isAdmin(userId, roomId);
      const isOwner = await this.isOwner(adminId,roomId);
      // if (isOwner)
      //   throw new WsException(`You can't Unban the room owner ${adminId}`);
      // check if the bannedUser is an admin and the one who perform the unBan action is also an admin 
      if (isBannedAdmin && !isOwner)
        throw new WsException(`only the owner who can unBan an admin`);
      const membership = await this.chatService.getMembership(userId,roomId);
      if (!membership)
        throw new WsException(`no membership between ${userId} and ${roomId}`);
      await this.prisma.membership.update({
        where: {
          id: membership.id
        },
        data: {
          isBanned : false,
        }
      });
      return ({roomId: roomId, userId: userId});

  }

    async addUserToRoom(adminId: number, body: AddUserToRoomDto)
    {
      const {roomId, userId} = body;
      if (!body) throw new WsException('roomId & addedUserId field are required !');
      const room = await this.getRoomById(roomId);
      
      const user = await this.userService.getUser(userId);
      if (!user) throw new WsException(`userId = ${userId} does not exist !`);
      const isAdmin = await this.isAdmin(adminId, room.id);
      if (!isAdmin) throw new WsException('only admins who can add users to rooms');
      const isMember = await this.isMember(userId, room.id);
      if (isMember) throw new WsException(`user is already member in #${room.name} room`);
      
      await this.prisma.membership.create({
          data: {
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
          },
      });
      const joinedRoom = await this.prisma.room.findUnique({
          where: {
              id: room.id,
          },
          select: {
          id: true,
          description: true,
          name: true,
          type: true,
          password: true,
          members: {
              select: {
                  id: true,
                  isAdmin: true,
                  isBanned: true,
                  isMute: true,
                  isOwner: true,
                  timeMute: true,
              user: {
                  select: {
                  avatar_url: true,
                  firstName: true,
                  lastName: true,
                  userName: true,
                  intraId: true,
                  },
              },
              },
          },
          createdAt: true,
          updatedAt: true,
          },
      });
      const retrivedRoom = await this.chatService.getRoom(room.id);
      return {
          dataMembership: retrivedRoom,
          dataRoom: joinedRoom,
      };

    }

  async unSetAdminOfRoom(body: SetRoomAdminDto, adminId: number)
  {
      const {userId, roomId} = body;
      const room = await this.getRoomById(roomId);
      if (!room)
          throw new WsException(`room ${roomId} not found`);
      // check if the user in the body exists
      const user = await this.userService.getUser(userId);
      if(!user)
              throw new WsException(`userId = ${userId} does not exist !`);
      const isOwner = await this.isOwner(adminId, roomId);
      if (!isOwner) {
          throw new WsException(`User with intraId ${adminId} is not the owner of the room, so he can't remove the admin privilege`);
      }
      const isAdmin = await this.isAdmin(userId, roomId)
      if (!isAdmin) {
        throw new WsException(`User with intraId ${userId} is not an admin in the room, so he can't be unsetted`);
      }
      // check if the user is already a member in this room
      const membership = await this.chatService.getMembership(userId,roomId);
      if (!membership)
        throw new WsException(`no membership between ${userId} and ${roomId}`);
      // update Membership
      await this.prisma.membership.update({
        where: {
          id: membership.id
        },
        data: {
          isAdmin: false
        }
      });
      return ({
        userId: userId,
        roomId: roomId
      });
  }

  /********************************************************************************************************* */
  // isOwner
  async isOwner(userId: number, roomId: number) {
    const result =
      await this.prisma.membership.findFirst({
        where: {
          userId: userId,
          roomId: roomId,
        },
        select: {
          isOwner: true,
        },
      });
    return result.isOwner;
  }

  // isAdmin
  async isAdmin(userId: number, roomId: number) {
    const isAdmin =
      await this.prisma.membership.findFirst({
        where: {
          userId: userId,
          roomId: roomId,
        },
        select: {
          isAdmin: true,
        },
      });
    return isAdmin.isAdmin;
  }

  // isMember
  async isMember(userId: number, roomId: number) {
    const isMember =
      await this.prisma.room.findFirst({
        where: {
          id: roomId,
          members: {
            some: {
              userId: userId,
            },
          },
        },
      });
    return isMember ? true : false;
  }

  async isMuted(dateNow: Date, muteTime)
  {
    return (new Date(muteTime) > dateNow) ? true: false;
  }

  // isBanned
  async isBanned(userId: number, roomId: number) {
    const isBanned =
      await this.prisma.membership.findFirst({
        where: {
          userId: userId,
          roomId: roomId,
        },
        select: {
          isBanned: true,
        },
      });
    return isBanned.isBanned;
  }

  async getConversationByRoomId(roomId: number) {
    const conversation =
      await this.prisma.conversation.findFirst({
        where: {
          roomId: roomId,
        },
      });
    return conversation;
  }

  async getUserMemeberships(
    user: User,
    res: Response,
  ) {
    const memberships =
      await this.prisma.membership.findMany({
        where: {
          userId: user.intraId,
          isBanned: false,
        },
        orderBy: {
          room: {
            createdAt: 'desc',
          },
        },
        select: {
          room: {
            select: {
              id: true,
              conversation: true,
              members: {
                select: {
                  isAdmin: true,
                  isBanned: true,
                  isMute: true,
                  isOwner: true,
                  timeMute: true,
                  user: {
                    select: {
                      firstName: true,
                      lastName: true,
                      userName: true,
                      intraId: true,
                      avatar_url: true,
                      status: true,
                      inGame: true,
                      inQueue: true
                    },
                  },
                },
              },
              name: true,
              createdAt: true,
              updatedAt: true,
              password: true,
              type: true,
              description: true,
            },
          },
        },
      });
    // Transform the data to match the desired format
    const transformedData = memberships.map(
      (membership) => ({
        id: membership.room.id,
        name: membership.room.name,
        description: membership.room.description,
        type: membership.room.type,
        password: membership.room.password,
        members: membership.room.members,
        conversation:
          membership.room.conversation,
        createdAt: membership.room.createdAt,
        updatedAt: membership.room.updatedAt,
      }),
    );
    return res.send({ data: transformedData });
  }

  /* currently this function is used to get 
        a specific data of the user in order 
        to add him to the room members when he joins. */
  async getMember(userId: number) {
    const member =
      await this.prisma.user.findUnique({
        where: {
          intraId: userId,
        },
        select: {
          userName: true,
          lastName: true,
          firstName: true,
          intraId: true,
          avatar_url: true,
          status: true,
        },
      });
    return member;
  }
}
