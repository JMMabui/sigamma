import { financeClient } from '../../database/scrpt.finance'

interface redundSchema {
  paymentId: string
  amount: number
  reason: string
}

export async function createRefund({
  paymentId,
  amount,
  reason,
}: redundSchema) {
  try {
    const refund = await financeClient.refund.create({
      data: {
        paymentId,
        amount,
        reason,
      },
    })
    return refund
  } catch (error) {
    throw new Error('Error creating refund')
  }
}

export async function listAllRefund() {
  try {
    const refund = await financeClient.refund.findMany()
    return refund
  } catch (error) {
    throw new Error('Error getting all refund')
  }
}

export async function getRefundById(id: string) {
  try {
    const refund = await financeClient.refund.findUnique({
      where: {
        id,
      },
    })
    return refund
  } catch (error) {
    throw new Error('Error getting refund by id')
  }
}

export async function updateRefund(id: string, data: Partial<redundSchema>) {
  try {
    const refund = await financeClient.refund.update({
      where: {
        id,
      },
      data,
    })
    return refund
  } catch (error) {
    throw new Error('Error updating refund')
  }
}

export async function deleteRefund(id: string) {
  try {
    const refund = await financeClient.refund.delete({
      where: {
        id,
      },
    })
    return refund
  } catch (error) {
    throw new Error('Error deleting refund')
  }
}
