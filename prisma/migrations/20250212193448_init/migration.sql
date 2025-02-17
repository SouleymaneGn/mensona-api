/*
  Warnings:

  - You are about to drop the `resetpassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `resetpassword` DROP FOREIGN KEY `ResetPassword_userId_fkey`;

-- DropTable
DROP TABLE `resetpassword`;

-- CreateTable
CREATE TABLE `Verification_codes` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `expiration` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Verification_codes_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Verification_codes` ADD CONSTRAINT `Verification_codes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
