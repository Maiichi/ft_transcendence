-- CreateTable
CREATE TABLE "Room" (
    "roomId" SERIAL NOT NULL,
    "roomName" VARCHAR NOT NULL,
    "roomOwnerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId")
);

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_roomOwnerId_fkey" FOREIGN KEY ("roomOwnerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
