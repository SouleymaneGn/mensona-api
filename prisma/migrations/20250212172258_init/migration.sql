/*
  Warnings:

  - You are about to drop the column `avatarFileKey` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isResettingPassword` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_avatarFileKey_key` ON `user`;

-- DropIndex
DROP INDEX `User_resetPasswordToken_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatarFileKey`,
    DROP COLUMN `firstName`,
    DROP COLUMN `isResettingPassword`,
    DROP COLUMN `resetPasswordToken`;
