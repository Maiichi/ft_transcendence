/*
  Warnings:

  - You are about to drop the column `hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `bookmarks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "hash",
ADD COLUMN     "avatar_url" TEXT;

-- DropTable
DROP TABLE "bookmarks";
