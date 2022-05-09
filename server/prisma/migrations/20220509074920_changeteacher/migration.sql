/*
  Warnings:

  - Made the column `firstname` on table `teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `teachers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "teachers" ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL;
