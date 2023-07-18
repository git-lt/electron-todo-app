/*
  Warnings:

  - You are about to drop the column `identity` on the `sys_verification_token` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier,token]` on the table `sys_verification_token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `sys_verification_token` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `sys_verification_token_identity_token_key` ON `sys_verification_token`;

-- AlterTable
ALTER TABLE `sys_verification_token` DROP COLUMN `identity`,
    ADD COLUMN `identifier` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `sys_verification_token_identifier_token_key` ON `sys_verification_token`(`identifier`, `token`);
