/*
  Warnings:

  - You are about to drop the column `participant1Id` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `participant2Id` on the `Game` table. All the data in the column will be lost.
  - Added the required column `opponentId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Made the column `winnerId` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_participant1Id_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_participant2Id_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "participant1Id",
DROP COLUMN "participant2Id",
ADD COLUMN     "opponentId" INTEGER NOT NULL,
ADD COLUMN     "playerId" INTEGER NOT NULL,
ALTER COLUMN "winnerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "users"("intraId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_opponentId_fkey" FOREIGN KEY ("opponentId") REFERENCES "users"("intraId") ON DELETE CASCADE ON UPDATE CASCADE;
