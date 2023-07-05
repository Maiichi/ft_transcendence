-- AlterTable
ALTER TABLE "users" ADD COLUMN     "twoFactorActivate" BOOLEAN DEFAULT false,
ADD COLUMN     "twoFactorSecret" VARCHAR(255);
