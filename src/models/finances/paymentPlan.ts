import { financeClient } from '../../database/scrpt.finance'

interface paymentPlanSchema {
  invoiceId: string
  totalAmount: number
  numInstallments: number
  installmentAmount: number
  dueDate: Date
}
export async function createPaymentPlan({
  invoiceId,
  totalAmount,
  numInstallments,
  installmentAmount,
  dueDate,
}: paymentPlanSchema) {
  try {
    const paymentPlan = await financeClient.paymentPlan.create({
      data: {
        invoiceId,
        totalAmount,
        numInstallments,
        installmentAmount,
        dueDate,
      },
    })
    return paymentPlan
  } catch (error) {
    throw new Error('Error creating payment plan')
  }
}

export async function getPaymentPlanByInvoiceId(invoiceId: string) {
  try {
    const paymentPlan = await financeClient.paymentPlan.findMany({
      where: {
        invoiceId,
      },
    })
    return paymentPlan
  } catch (error) {
    throw new Error('Error getting payment plan by invoice id')
  }
}

export async function listAllPaymentsPlans() {
  try {
    const paymentPlan = await financeClient.paymentPlan.findMany()
    return paymentPlan
  } catch (error) {
    throw new Error('Error listing all payment plans')
  }
}

export async function updatePaymentPlan(
  id: string,
  data: Partial<paymentPlanSchema>
) {
  try {
    const paymentPlan = await financeClient.paymentPlan.update({
      where: {
        id,
      },
      data,
    })
    return paymentPlan
  } catch (error) {
    throw new Error('Error updating payment plan')
  }
}

export async function deletePaymentPlan(id: string) {
  try {
    const paymentPlan = await financeClient.paymentPlan.delete({
      where: {
        id,
      },
    })
    return paymentPlan
  } catch (error) {
    throw new Error('Error deleting payment plan')
  }
}

export async function getPaymentPlanById(id: string) {
  try {
    const paymentPlan = await financeClient.paymentPlan.findUnique({
      where: {
        id,
      },
    })
    return paymentPlan
  } catch (error) {
    throw new Error('Error getting payment plan by id')
  }
}

export async function getPaymentPlanByDueDate(dueDate: Date) {
  try {
    const paymentPlan = await financeClient.paymentPlan.findMany({
      where: {
        dueDate,
      },
    })
    return paymentPlan
  } catch (error) {
    throw new Error('Error getting payment plan by due date')
  }
}
