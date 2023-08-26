import { IsNumber } from "class-validator";


export class SendFriendRequestDto
{
    @IsNumber()
    receiverId: number
}

export class AcceptFriendRequestDto
{
    @IsNumber()
    senderId: number
}