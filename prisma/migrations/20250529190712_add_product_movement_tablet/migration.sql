/*
  Warnings:

  - Added the required column `productMovementId` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MovementType" AS ENUM ('Inbound', 'Outbound', 'Transfer', 'Adjustment');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "productMovementId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProductMovement" (
    "id" TEXT NOT NULL,
    "type" "MovementType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductMovement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productMovementId_fkey" FOREIGN KEY ("productMovementId") REFERENCES "ProductMovement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
