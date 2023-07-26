import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { CreateRoomDto } from "../dto/create.room.dto";
import { ChatService } from "../chat.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { UpdateRoomDto } from "../dto/update.room.dto";
import { User } from "@prisma/client";
import { JoinRoomDto } from "../dto/join.room.dto";
import { KickMemberDto, LeaveRoomDto, MuteMemberDto, SetRoomAdminDto } from "../dto/update.user.membership.dto";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect
{   
    @WebSocketServer()
    server: Server;


    private connectedClients = new Map<string, User>();
    private userSocket       = new Map<number, string[]>();
    private BlackListedTokens= new Map<string, number>();

    constructor(
        private chatService: ChatService,
        private jwtService : JwtService,
        private userService: UserService
    ){}
    
    
    printClients()
    {
        console.log("users connected {" );
        this.connectedClients.forEach((value, key) =>{
            console.log("socketId = " + key + " || username = " + value.userName);
        })
        console.log("}");
    }

    printClientSockets()
    {
        console.log("user sockets {" );
        this.userSocket.forEach((value, key) =>{
            console.log("user = " + key + " || socketID = " + value);
        })
        console.log("}");
    }

    deleteUserSockets(intraId: number)
    {
        const sockets = this.userSocket.get(intraId);
        if (sockets) 
        {
            sockets.forEach((socketId) => {
                const socket = this.server.sockets.sockets[socketId];
                if (socket) {
                    socket.disconnect();
                }
            });
            this.userSocket.delete(intraId);
        }
    }

    // deleteUserDisconnected(intraId: number)
    // {
    //     this.connectedClients.forEach((mapUser, mapId) => {
    //         if (mapUser.intraId === intraId) {
    //           this.connectedClients.delete(mapId);
    //         }
    //     });
    // }

    deleteUserDisconnected(intraId: number) {
        const disconnectedSockets = [];
        this.connectedClients.forEach((mapUser, mapId) => {
            if (mapUser.intraId === intraId) {
            disconnectedSockets.push(mapId);
            }
        });

        disconnectedSockets.forEach(socketId => {
            this.connectedClients.delete(socketId);
        });
    }

    // disconnectAllUserSocket(intraId: number)
    // {

    // }

    findUserByClientSocketId(clientId: string)
    {
        let ret = null
        this.connectedClients.forEach((user, socketId) => {
            if (socketId == clientId)
                ret = user;
        })
        return ret;
    }


    async handleConnection(client: Socket) {
        const token = client.handshake.headers.authorization;
        try {
            const decodedToken = await this.jwtService.verify(token,{secret:process.env.JWT_SECRET});
            // if (this.BlackListedTokens.has(token))
            //     throw new WsException(`Token is black listed please re-login`);
            const user = await this.userService.getUser(decodedToken.sub);
            if (!user)
                throw new  WsException('User not found.');
            this.connectedClients.set(client.id, user);
            if (!this.userSocket.has(user.intraId)) 
                this.userSocket.set(user.intraId, []);
            this.userSocket.get(user.intraId).push(client.id);
            this.userService.updateUserStatus(user.intraId, 'ONLINE');
            this.server.emit('userConnected', {userId: client.id})

            console.log(user.userName + ' is Connected ' + client.id)
        } catch (error) {
            client.disconnect();
            console.log("Client disconnected due to invalid authorization");
            const response = {
                success: false,
                message: error.message
            }
            console.log(response);
            return (response);
        }
    }


    // TODO: need to be tested to check if the user is logged of from all the tabs
    handleDisconnect(client: Socket) {
        try {
            const token = client.handshake.headers.authorization;
            const user = this.connectedClients.get(client.id);
            if (user) {
                this.deleteUserSockets(user.intraId);
                this.deleteUserDisconnected(user.intraId);
                // this.connectedClients.delete(client.id);
                this.userService.updateUserStatus(user.intraId, 'OFFLINE');
                // TODO: the token need to be hashed before it persisted in the black-list of tokens
                // this.BlackListedTokens.set(token, user.intraId);
                this.server.emit('userDisconnected', { userId: client.id });
                client.disconnect();
                console.log(user.userName + ' is Disconnected ' + client.id);
            }
            else
                throw new WsException(`cannot find the user`);
        } catch (error) {
            client.emit(error);
        }
    }

    @SubscribeMessage('createRoom')
    async createRoom(client: Socket, createRoomDto: CreateRoomDto) {
        try {
            // get current User 
            console.log("here")
            const currentUser = this.findUserByClientSocketId(client.id);
            console.log("here 1")
            const room = await this.chatService.createRoom(createRoomDto, currentUser.intraId);
            console.log("here 2")
            console.log("client == " + client.id);
            console.log("room create successfully");
            this.server.emit('roomCreated', room);    
            console.log("here 3")
        } catch (error) {
            console.log('err ||', error.message);
        }
    }
    

    @SubscribeMessage('updateRoom')
    async updateRoom(@ConnectedSocket() client: Socket, @MessageBody() body: UpdateRoomDto)
    {
        try {
            // get current User 
            const currentUser = this.findUserByClientSocketId(client.id);
            const roomUpdated = await this.chatService.updateRoomById(body, currentUser.intraId);
            this.server.emit('roomUpdated', roomUpdated);
            console.log("room updated successfully");
        } catch (error) {
            // if (error instanceof NotFoundException)
            //     console.log("Room not found:", error.message);
            // else
                console.log(error.message)
        }
    }

    @SubscribeMessage('joinRoom')
    async joinRoom(@ConnectedSocket() client: Socket, @MessageBody() body: JoinRoomDto)
    {
        try {
            const currentUser = this.findUserByClientSocketId(client.id);
            await this.chatService.joinRoom(body, currentUser.intraId);
            this.server.emit('joinRoom');
            console.log("room updated successfully");
        } catch (error) {
            console.log(error.message)
        }
    }

    // leave room
    @SubscribeMessage('leaveRoom')
    async leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() body: LeaveRoomDto)
    {
        try {
            const currentUser = this.findUserByClientSocketId(client.id);
            await this.chatService.leaveRoom(body, currentUser.intraId);
            this.server.emit('leaveRoom');
        } catch (error) {
            console.log("Subs error =" + error.message)
        }
    }

    // set room Admins
    @SubscribeMessage('setRoomAdmin')
    async setRoomAdmin(@ConnectedSocket() client: Socket, @MessageBody() body: SetRoomAdminDto)
    {
        try {
            const currentUser = this.findUserByClientSocketId(client.id);
            await this.chatService.setAdminToRoom(body, currentUser.intraId);
            this.server.emit('setRoomAdmin');
        } catch (error) {
            console.log("Subs error =" + error.message)
        }
    }
    // remove Channel Admins
    
    // kick member
    @SubscribeMessage('kickMember')
    async kickMember(@ConnectedSocket() client: Socket, @MessageBody() body: KickMemberDto)
    {
        try {
            const currentUser = this.findUserByClientSocketId(client.id);
            await this.chatService.kickMember(body, currentUser.intraId);
            this.server.emit('kickMember');
        } catch (error) {
            console.log("Subs error =" + error.message)
        }
    }
    
    // mute member
    @SubscribeMessage('muteMember')
    async muteMemeber(@ConnectedSocket() client: Socket, @MessageBody() body: MuteMemberDto)
    {
        try {
            const currentUser = this.findUserByClientSocketId(client.id);
            await this.chatService.muteMember(currentUser.intraId, body);
            this.server.emit('muteMember');
        } catch (error) {
            console.log("Subs error =" + error.message);
        }
    }
    
    @SubscribeMessage('logout')
    async logout(@ConnectedSocket() client: Socket)
    {
        try {
            this.handleConnection(client);
        } catch (error) {
            const response = {
                success: false,
                message: error.message
            };
            return response;
        }
    }

    // ban member
    // @SubscribeMessage('sendMessage')
    // async sendMessage(@ConnectedSocket() client: Socket)
    // {

    // }
}