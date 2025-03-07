import { financeClient } from '../../database/scrpt.finance'

interface penaltySchema {
  invoiceId: string
  amount: number
  reason: string
}

export async function createPenalty({
  invoiceId,
  amount,
  reason,
}: penaltySchema) {
  try {
    const penalty = await financeClient.penalty.create({
      data: {
        invoiceId,
        amount,
        reason,
      },
    })
    return penalty
  } catch (error) {
    throw new Error('Error creating penalty')
  }
}

export async function listAllPenalty() {
  try {
    const penalties = await financeClient.penalty.findMany()
    return penalties
  } catch (error) {
    throw new Error('Error getting penalties')
  }
}

export async function getPenaltyById(id: string) {
  try {
    const penalty = await financeClient.penalty.findUnique({
      where: {
        id,
      },
    })
    return penalty
  } catch (error) {
    throw new Error('Error getting penalty by id')
  }
}

export async function updatePenalty(id: string, data: Partial<penaltySchema>) {
  try {
    const penalty = await financeClient.penalty.update({
      where: {
        id,
      },
      data,
    })
    return penalty
  } catch (error) {
    throw new Error('Error updating penalty')
  }
}

export async function deletePenalty(id: string) {
  try {
    const penalty = await financeClient.penalty.delete({
      where: {
        id,
      },
    })
    return penalty
  } catch (error) {
    throw new Error('Error deleting penalty')
  }
}

export async function getPenaltyByInvoiceId(invoiceId: string) {
  try {
    const penalty = await financeClient.penalty.findMany({
      where: {
        invoiceId,
      },
    })
    return penalty
  } catch (error) {
    throw new Error('Error getting penalty by invoice id')
  }
}
