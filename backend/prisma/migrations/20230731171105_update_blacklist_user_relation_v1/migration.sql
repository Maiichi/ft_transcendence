/*
  Warnings:

  - You are about to drop the column `blockedUserId` on the `Blacklist` table. All the data in the column will be lost.
  - Added the required column `blockerById` to the `Blacklist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blacklist" DROP CONSTRAINT "Blacklist_blockedUserId_fkey";

-- AlterTable
ALTER TABLE "Blacklist" DROP COLUMN "blockedUserId",
ADD COLUMN     "blockerById" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Blacklist" ADD CONSTRAINT "Blacklist_blockerById_fkey" FOREIGN KEY ("blockerById") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;
