/*
  Warnings:

  - You are about to drop the column `supplierName` on the `Products` table. All the data in the column will be lost.
  - Added the required column `supplierId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_supplierName_fkey";

-- DropIndex
DROP INDEX "Supplier_name_key";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "supplierName",
ADD COLUMN     "supplierId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
