/*
  Warnings:

  - You are about to drop the column `productMovementId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ProductMovement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_productMovementId_fkey";

-- AlterTable
ALTER TABLE "ProductMovement" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "productMovementId";

-- AddForeignKey
ALTER TABLE "ProductMovement" ADD CONSTRAINT "ProductMovement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
