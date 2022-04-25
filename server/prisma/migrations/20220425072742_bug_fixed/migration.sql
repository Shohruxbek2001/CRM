/*
  Warnings:

  - Added the required column `date_of_start` to the `courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "date_of_start",
ADD COLUMN     "date_of_start" TIMESTAMP NOT NULL;
