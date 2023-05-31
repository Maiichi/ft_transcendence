/*
  Warnings:

  - You are about to alter the column `firstName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `lastName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `userName` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `avatar_url` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `firstName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userName` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "userName" SET NOT NULL,
ALTER COLUMN "userName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "avatar_url" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");
