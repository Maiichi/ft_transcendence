import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {

    private createGameRoom(player1: string, player2: string): string {
        // Here you can implement logic to create a new game room and return its ID
        const roomId = `room_${Math.random().toString(36).substring(7)}`;
        // You might want to keep track of the players in the room or other details
        // based on your game requirements.
        return roomId;
    }
}
