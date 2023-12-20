-- AlterTable
ALTER TABLE "users" ADD COLUMN     "inGame" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "participant1Id" INTEGER NOT NULL,
    "participant2Id" INTEGER NOT NULL,
    "winnerId" INTEGER,
    "score1" INTEGER NOT NULL,
    "score2" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_participant1Id_fkey" FOREIGN KEY ("participant1Id") REFERENCES "users"("intraId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_participant2Id_fkey" FOREIGN KEY ("participant2Id") REFERENCES "users"("intraId") ON DELETE CASCADE ON UPDATE CASCADE;
