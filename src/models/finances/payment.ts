import { payment } from './../../route/finance/payment-route'
import type { PaymentMethod, PaymentStatus } from '../../../generated/finance'
import { financeClient } from '../../database/scrpt.finance'

interface paymentSchema {
  invoiceId: string
  amount: number
  paymentDate: Date
  method: PaymentMethod
  status: PaymentStatus
}

export async function createPayment({
  invoiceId,
  amount,
  method,
  paymentDate,
  status,
}: paymentSchema) {
  try {
    const payment = await financeClient.payment.create({
      data: {
        invoiceId,
        amount,
        paymentDate,
        method,
        status,
      },
    })
    return payment
  } catch (error) {
    throw new Error('Error creating payment')
  }
}

export async function listAllPayments() {
  try {
    const payments = await financeClient.payment.findMany()
    return payments
  } catch (error) {
    throw new Error('Error getting payments')
  }
}

export async function updatePayment(id: string, data: paymentSchema) {
  try {
    const payment = await financeClient.payment.update({
      where: {
        id,
      },
      data,
    })
    return payment
  } catch (error) {
    throw new Error('Error updating payment')
  }
}

export async function deletePayment(id: string) {
  try {
    const payment = await financeClient.payment.delete({
      where: {
        id,
      },
    })
    return payment
  } catch (error) {
    throw new Error('Error deleting payment')
  }
}

export async function getPayment(id: string) {
  try {
    const payment = await financeClient.payment.findUnique({
      where: {
        id,
      },
    })
    return payment
  } catch (error) {
    throw new Error('Error getting payment')
  }
}
