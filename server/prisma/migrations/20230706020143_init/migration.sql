/*
  Warnings:

  - You are about to drop the column `create_at` on the `sys_user` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `sys_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sys_user` DROP COLUMN `create_at`,
    DROP COLUMN `update_at`;
