/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `Verification_codes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Verification_codes_userId_type_key` ON `Verification_codes`(`userId`, `type`);
