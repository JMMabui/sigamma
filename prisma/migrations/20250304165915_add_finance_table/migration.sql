/*
  Warnings:

  - A unique constraint covering the columns `[paymentPlanId]` on the table `invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "finance"."InvoiceStatus" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "finance"."invoice" ADD COLUMN     "discountAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "paymentPlanId" TEXT,
ADD COLUMN     "penaltyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "finance"."penalty" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "penalty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance"."discount" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance"."payment_plan" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "numInstallments" INTEGER NOT NULL,
    "installmentAmount" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance"."refund" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "refundedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT NOT NULL,

    CONSTRAINT "refund_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_plan_invoiceId_key" ON "finance"."payment_plan"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_paymentPlanId_key" ON "finance"."invoice"("paymentPlanId");

-- AddForeignKey
ALTER TABLE "finance"."penalty" ADD CONSTRAINT "penalty_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "finance"."invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance"."discount" ADD CONSTRAINT "discount_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "finance"."invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance"."payment_plan" ADD CONSTRAINT "payment_plan_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "finance"."invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "finance"."refund" ADD CONSTRAINT "refund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "finance"."payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
