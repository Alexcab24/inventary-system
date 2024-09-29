-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user', 'contador');

-- CreateTable
CREATE TABLE "Company" (
    "id_tenant" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "rnc" TEXT,
    "logotype" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suscription_plan" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id_tenant")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'admin',
    "companyId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id_tenant") ON DELETE RESTRICT ON UPDATE CASCADE;
