/*
  Warnings:

  - A unique constraint covering the columns `[intraId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intraId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "intraId" INTEGER NOT NULL,
ADD COLUMN     "userName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_intraId_key" ON "users"("intraId");
