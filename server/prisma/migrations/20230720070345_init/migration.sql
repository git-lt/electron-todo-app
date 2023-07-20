/*
  Warnings:

  - You are about to drop the `TeamMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceMembership` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TeamMembership` DROP FOREIGN KEY `TeamMembership_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamMembership` DROP FOREIGN KEY `TeamMembership_userId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceMembership` DROP FOREIGN KEY `WorkspaceMembership_userId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceMembership` DROP FOREIGN KEY `WorkspaceMembership_workspaceId_fkey`;

-- DropTable
DROP TABLE `TeamMembership`;

-- DropTable
DROP TABLE `WorkspaceMembership`;

-- CreateTable
CREATE TABLE `workspace_membership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `workspaceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_membership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `workspace_membership` ADD CONSTRAINT `workspace_membership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sys_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspace_membership` ADD CONSTRAINT `workspace_membership_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_membership` ADD CONSTRAINT `team_membership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sys_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team_membership` ADD CONSTRAINT `team_membership_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
