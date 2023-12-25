import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "../user.service";
import { BlacklistService } from "../blacklist/blacklist.service";
import { AcceptFriendRequestDto, SendFriendRequestDto } from "./dto/friend.dto";
import { WsException } from "@nestjs/websockets";
import { Response } from "express";



@Injectable()
export class FriendService
{
    constructor(
        private prisma:             PrismaService,
        private userService:        UserService,
        private blacklistService:   BlacklistService
    ){}


    // TODO: need to check if both users are already friends
    async sendFriendRequest(body: SendFriendRequestDto, userId: number)
    {
        const sender = await this.userService.getUser(userId);
        if(!sender)
            throw new WsException(`(sender) userId = ${userId} does not exist !`);
        const receiver = await this.userService.getUser(body.receiverId);
        if (!receiver)
            throw new WsException(`(receiver) userId = ${body.receiverId} does not exist !`);
        // check if a user sends a friend request to him self
        if (sender.intraId === receiver.intraId)
            throw new WsException(`you can't send a friend request to ur self`);
        // check blacklist before sending a friend request
        const isBlockedByYou = await this.blacklistService.isBlockedByYou(sender.intraId, receiver.intraId);
        const isBlockingYou  = await this.blacklistService.isBlockingYou(sender.intraId, receiver.intraId);

        if (isBlockingYou)
            throw new WsException(`${receiver.userName} is Blocking you, you can't send him a friend Req`);
        if (isBlockedByYou)
            throw new WsException(`${receiver.userName} is blocked by you, you can't send him a friend req`);
        // check if they are already friends
        const isFriend = await this.isFriend(sender.intraId, receiver.intraId);
        if (isFriend)
            throw new WsException(`${sender.userName} and ${receiver.userName} are already friends`);
        // check if friend request is already sent
        const isRequestSentByYou = await this.isFriendRequestSentByYou(sender.intraId, receiver.intraId);
        const isRequestSentByHim = await this.isFriendRequestSentByHim(sender.intraId, receiver.intraId);

        if (isRequestSentByYou)
            throw new WsException(`${sender.userName} already sent a friend request to ${receiver.userName}`);
        if (isRequestSentByHim)
            throw new WsException(`${receiver.userName} already sent a friend request to you, accept him`);
        // create friend request
        const FriendRequest = await this.prisma.friendRequest.create({
            data : {
                accepted : false,
                sender : 
                {
                    connect : {intraId : sender.intraId}
                },
                receiver : {
                    connect : { intraId: receiver.intraId}
                }
            }
        });
        if (!FriendRequest)
            throw new WsException(`Error while creating new friend Request`);
        console.log(`${sender.userName} has sent a friend request to ${receiver.userName}`);
        return FriendRequest;
        
    }

    // accept friend Request
    async acceptFriendRequest(body: AcceptFriendRequestDto, userId: number)
    {
        // userAccept is the user who accept the friend request
        const userAccept = await this.userService.getUser(userId);
        if(!userAccept)
            throw new WsException(`(userAccept) userId = ${userAccept} does not exist !`);
        const requestSender = await this.userService.getUser(body.senderId);
        if (!requestSender)
            throw new WsException(`(sender) userId = ${body.senderId} does not exist !`);
        if (userAccept.intraId === requestSender.intraId)
            throw new WsException(`you can't accept a friend request to ur self`);
        // check blacklist before sending a friend request
        const isBlockedByYou = await this.blacklistService.isBlockedByYou(userAccept.intraId, userAccept.intraId);
        const isBlockingYou  = await this.blacklistService.isBlockingYou(userAccept.intraId, userAccept.intraId);

        if (isBlockingYou)
            throw new WsException(`${requestSender.userName} is Blocking you`);
        if (isBlockedByYou)
            throw new WsException(`${requestSender.userName} is blocked by you`);
        
        const isFriend = await this.isFriend(userAccept.intraId, requestSender.intraId);
        if (isFriend)
            throw new WsException(`${userAccept.userName} and ${requestSender.userName} are already friends`);
        
        // check if friend request is already sent
        const isRequestSentByYou = await this.isFriendRequestSentByYou(userAccept.intraId, requestSender.intraId);
        const isRequestSentByHim = await this.isFriendRequestSentByHim(userAccept.intraId, requestSender.intraId);

        if (isRequestSentByYou)
            throw new WsException(`${userAccept.userName} already sent a friend request to ${requestSender.userName}`);
        // let updateFriendRequest;
        if (!isRequestSentByHim)
            throw new WsException(`${requestSender.userName} hasnt sent you a friend request`);
        // get the request ID;
        const getFriendRequestId: number = await this.getFriendRequestId(requestSender.intraId, userAccept.intraId);
        // update the friend request if the user accept it
        await this.prisma.friendRequest.delete({
                where : {
                    id: getFriendRequestId
                }
            });
        // add the new user to his friend
        const updateUserFriends = await this.prisma.user.update({
            where : {
                intraId : userAccept.intraId
            },
            data: {
                friends : {
                    connect : {
                        intraId : requestSender.intraId
                    }
                },
                friendsOf : {
                    connect : {
                        intraId : requestSender.intraId
                    }
                },
            }
        })
        if (!updateUserFriends)
            throw new WsException(`Error while updating the user friends list`);
        console.log(`${userAccept.userName} has accepted ${requestSender}`)
        return updateUserFriends;
    }

    // decline a friend Request 
    async declineFriendRequest(body: AcceptFriendRequestDto, userId: number)
    {
        // userDecline is the user who decline the friend request
        const userDecline = await this.userService.getUser(userId);
        if(!userDecline)
            throw new WsException(`(userDecline) userId = ${userDecline} does not exist !`);
        const requestSender = await this.userService.getUser(body.senderId);
        if (!requestSender)
            throw new WsException(`(sender) userId = ${body.senderId} does not exist !`);
        if (userDecline.intraId === requestSender.intraId)
            throw new WsException(`you can't decline a friend request to ur self`);
        // check blacklist before sending a friend request
        const isBlockedByYou = await this.blacklistService.isBlockedByYou(userDecline.intraId, userDecline.intraId);
        const isBlockingYou  = await this.blacklistService.isBlockingYou(userDecline.intraId, userDecline.intraId);

        if (isBlockingYou)
            throw new WsException(`${requestSender.userName} is Blocking you`);
        if (isBlockedByYou)
            throw new WsException(`${requestSender.userName} is blocked by you`);
        
        // const isFriend = await this.isFriend(userDecline.intraId, requestSender.intraId);
        // if (!isFriend)
        //     throw new WsException(`${userDecline.userName} and ${requestSender.userName} are already friends`);
        
        // check if friend request is already sent
        const isRequestSentByYou = await this.isFriendRequestSentByYou(userDecline.intraId, requestSender.intraId);
        const isRequestSentByHim = await this.isFriendRequestSentByHim(userDecline.intraId, requestSender.intraId);

        if (isRequestSentByYou)
            throw new WsException(`${userDecline.userName} already sent a friend request to ${requestSender.userName}`);
        // let updateFriendRequest;
        if (!isRequestSentByHim)
            throw new WsException(`${requestSender.userName} hasnt sent you a friend request`);
        // get the request ID;
        const getFriendRequestId: number = await this.getFriendRequestId(requestSender.intraId, userDecline.intraId);
        // update the friend request if the user accept it
        const deletedFriendRequest = await this.prisma.friendRequest.delete({
                where : {
                    id: getFriendRequestId
                }
            });
    
        console.log(`${userDecline.userName} has declined ${requestSender} friend request`);
        return deletedFriendRequest;
    }

    async isFriendRequestSentByYou(senderId: number, receiverId: number)
    {
        const isSent = await this.prisma.friendRequest.findFirst({
            where :{
                senderId : senderId,
                receiverId: receiverId,
                accepted: false
            }
        });
        const res = isSent ? true : false;
        return res;
    }

    async isFriendRequestSentByHim(senderId: number, receiverId: number)
    {
        const isSent = await this.prisma.friendRequest.findFirst({
            where :{
                senderId : receiverId,
                receiverId: senderId,
                accepted: false
            }
        });
        const res = isSent ? true : false;
        return res;
    }

    async getFriendRequestId(senderId: number, receiverId: number)
    {
        const getId = await this.prisma.friendRequest.findFirst({
            where : {
                senderId : senderId,
                receiverId: receiverId
            }
        });
        return getId.id;
    }

    async isFriend(senderId: number, receiverId: number) : Promise<boolean>{
        const isFriend = await this.prisma.user.findUnique({
            where: {
                intraId: senderId,
                friends: {
                    some: {
                        intraId: receiverId,
                    },
                },
                friendsOf: {
                    some: {
                        intraId: receiverId,
                    },
                },
            },
        });
        const res: boolean = !!isFriend; // Convert to boolean
        return res;
    }
}

