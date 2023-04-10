/*
  Warnings:

  - Added the required column `url` to the `Pictures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pictures" ADD COLUMN     "url" TEXT NOT NULL;
