/*
  Warnings:

  - You are about to drop the column `create_at` on the `dictionary` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `dictionary` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `dictionary` table. All the data in the column will be lost.
  - You are about to drop the `dictionary_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[site]` on the table `workspace` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `dictionary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `dictionary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelId` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priorityId` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progressId` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workspaceId` to the `team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `workspace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `site` to the `workspace` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dictionary` DROP COLUMN `create_at`,
    DROP COLUMN `type`,
    DROP COLUMN `update_at`,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `icon` VARCHAR(191) NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `typeId` INTEGER NOT NULL,
    ADD COLUMN `value` INTEGER NULL,
    MODIFY `code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `workspaceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `productId` INTEGER NULL,
    ADD COLUMN `teamId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `assigneeId` VARCHAR(191) NULL,
    ADD COLUMN `labelId` INTEGER NOT NULL,
    ADD COLUMN `priorityId` INTEGER NOT NULL,
    ADD COLUMN `progressId` INTEGER NOT NULL,
    ADD COLUMN `typeId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `team` ADD COLUMN `workspaceId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `workspace` ADD COLUMN `owner_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `site` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `dictionary_type`;

-- DropTable
DROP TABLE `role`;

-- CreateTable
CREATE TABLE `WorkspaceMembership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `workspaceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMembership` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dictionary_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `workspace_site_key` ON `workspace`(`site`);

-- AddForeignKey
ALTER TABLE `workspace` ADD CONSTRAINT `workspace_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `sys_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `team` ADD CONSTRAINT `team_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkspaceMembership` ADD CONSTRAINT `WorkspaceMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sys_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkspaceMembership` ADD CONSTRAINT `WorkspaceMembership_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMembership` ADD CONSTRAINT `TeamMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `sys_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMembership` ADD CONSTRAINT `TeamMembership_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_priorityId_fkey` FOREIGN KEY (`priorityId`) REFERENCES `dictionary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `dictionary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_progressId_fkey` FOREIGN KEY (`progressId`) REFERENCES `dictionary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_labelId_fkey` FOREIGN KEY (`labelId`) REFERENCES `dictionary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dictionary` ADD CONSTRAINT `dictionary_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `dictionary_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
