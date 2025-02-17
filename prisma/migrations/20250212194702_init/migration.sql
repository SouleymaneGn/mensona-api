-- DropForeignKey
ALTER TABLE `verification_codes` DROP FOREIGN KEY `Verification_codes_userId_fkey`;

-- AlterTable
ALTER TABLE `verification_codes` MODIFY `type` VARCHAR(191) NULL,
    MODIFY `code` VARCHAR(191) NULL,
    MODIFY `expiration` DATETIME(3) NULL,
    MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Verification_codes` ADD CONSTRAINT `Verification_codes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
