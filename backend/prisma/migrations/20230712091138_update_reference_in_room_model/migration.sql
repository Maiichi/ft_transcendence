-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_roomOwnerId_fkey";

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomOwnerId_fkey" FOREIGN KEY ("roomOwnerId") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;
