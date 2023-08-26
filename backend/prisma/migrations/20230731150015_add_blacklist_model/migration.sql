-- CreateTable
CREATE TABLE "Blacklist" (
    "id" SERIAL NOT NULL,
    "blockedById" INTEGER NOT NULL,
    "blockedUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blacklist" ADD CONSTRAINT "Blacklist_blockedById_fkey" FOREIGN KEY ("blockedById") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blacklist" ADD CONSTRAINT "Blacklist_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "users"("intraId") ON DELETE RESTRICT ON UPDATE CASCADE;
