/*
  Warnings:

  - You are about to drop the column `contact` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `email` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "contact",
ADD COLUMN     "email" TEXT NOT NULL;
