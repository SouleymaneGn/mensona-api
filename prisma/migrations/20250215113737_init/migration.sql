-- DropForeignKey
ALTER TABLE `verification_codes` DROP FOREIGN KEY `Verification_codes_userId_fkey`;

-- DropIndex
DROP INDEX `Verification_codes_userId_key` ON `verification_codes`;

-- AddForeignKey
ALTER TABLE `Verification_codes` ADD CONSTRAINT `Verification_codes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
