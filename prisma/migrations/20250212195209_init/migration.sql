/*
  Warnings:

  - Made the column `type` on table `verification_codes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `verification_codes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiration` on table `verification_codes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `verification_codes` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `verification_codes` DROP FOREIGN KEY `Verification_codes_userId_fkey`;

-- AlterTable
ALTER TABLE `verification_codes` MODIFY `type` VARCHAR(191) NOT NULL,
    MODIFY `code` VARCHAR(191) NOT NULL,
    MODIFY `expiration` DATETIME(3) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Verification_codes` ADD CONSTRAINT `Verification_codes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
