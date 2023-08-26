/*
  Warnings:

  - You are about to drop the `RoomMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserConversation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomMembership" DROP CONSTRAINT "RoomMembership_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomMembership" DROP CONSTRAINT "RoomMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserConversation" DROP CONSTRAINT "UserConversation_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "UserConversation" DROP CONSTRAINT "UserConversation_intraId_fkey";

-- DropTable
DROP TABLE "RoomMembership";

-- DropTable
DROP TABLE "UserConversation";

-- CreateTable
CREATE TABLE "Membership" (
    "id" SERIAL NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "isMute" BOOLEAN NOT NULL DEFAULT false,
    "timeMute" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;
