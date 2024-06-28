/*
  Warnings:

  - You are about to drop the `caracteristicas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `caracteristicas` to the `Motos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `caracteristicas` DROP FOREIGN KEY `Caracteristicas_motoId_fkey`;

-- AlterTable
ALTER TABLE `motos` ADD COLUMN `caracteristicas` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `caracteristicas`;
