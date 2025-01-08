/*
  Warnings:

  - You are about to drop the column `supplierId` on the `Products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplierName` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_supplierId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "supplierId",
ADD COLUMN     "supplierName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier"("name");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_supplierName_fkey" FOREIGN KEY ("supplierName") REFERENCES "Supplier"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
