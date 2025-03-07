import { financeClient } from '../../database/scrpt.finance'
import type { InvoiceStatus } from './../../../generated/finance/index.d'
interface invoiceSchema {
  studentId: string
  amount: number
  dueDate: Date
  status: InvoiceStatus
  penaltyAmount: number
  discountAmount: number
  totalAmount: number
}

export async function createInvoice({
  studentId,
  amount,
  dueDate,
  status,
  penaltyAmount,
  discountAmount,
  totalAmount,
}: invoiceSchema) {
  try {
    const invoice = await financeClient.invoice.create({
      data: {
        studentId,
        amount,
        dueDate,
        status,
        penaltyAmount,
        discountAmount,
        totalAmount,
      },
    })
    return invoice
  } catch (error) {
    throw new Error('Error creating invoice')
  }
}

export async function listAllInvoice() {
  try {
    const invoice = await financeClient.invoice.findMany()
    return invoice
  } catch (error) {
    throw new Error('Error listing invoices')
  }
}

export async function getInvoiceById(id: string) {
  try {
    const invoice = await financeClient.invoice.findUnique({
      where: {
        id,
      },
    })
    return invoice
  } catch (error) {
    throw new Error(`Error getting invoice for: ${id}`)
  }
}

export async function updateInvoice(id: string, data: Partial<invoiceSchema>) {
  try {
    const invoice = await financeClient.invoice.update({
      where: {
        id,
      },
      data,
    })
    return invoice
  } catch (error) {
    throw new Error(`Error updating invoice for: ${id}`)
  }
}

export async function deleteInvoice(id: string) {
  try {
    const invoice = await financeClient.invoice.delete({
      where: {
        id,
      },
    })
    return invoice
  } catch (error) {
    throw new Error(`Error deleting invoice for: ${id}`)
  }
}
