/*
  Warnings:

  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `status` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_admins" DROP CONSTRAINT "_admins_A_fkey";

-- DropForeignKey
ALTER TABLE "_members" DROP CONSTRAINT "_members_A_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_ownerId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "status" SET NOT NULL;

-- DropTable
DROP TABLE "rooms";

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "type" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "password" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members" ADD CONSTRAINT "_members_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD CONSTRAINT "_admins_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
