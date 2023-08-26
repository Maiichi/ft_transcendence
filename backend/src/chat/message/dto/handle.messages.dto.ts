import { IsNumber, IsString } from "class-validator"

    export class SendMessageToUserDto 
    {
        @IsNumber()
        receiverId: number;

        @IsString()
        content: string;

    }

    export class SendMessageToRoomDto
    {
        @IsNumber()
        roomId: number;

        @IsString()
        content: string;
    }

    // export class getUserDirectConversationDto
    // {

    // }