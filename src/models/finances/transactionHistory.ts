import { financeClient } from '../../database/scrpt.finance'

interface transactionHistory {
  paymentId: string
  description: string
  transactionDate: Date
  amount: number
}

export async function createTransactionHistory({
  paymentId,
  description,
  transactionDate,
  amount,
}: transactionHistory) {
  try {
    const transactionHistory = await financeClient.transactionHistory.create({
      data: {
        paymentId,
        description,
        transactionDate,
        amount,
      },
    })
    return transactionHistory
  } catch (error) {
    throw new Error('Error creating transaction history')
  }
}

export async function listAllTransactionHistory() {
  try {
    const transactionHistory = await financeClient.transactionHistory.findMany()
    return transactionHistory
  } catch (error) {
    throw new Error('Error listing transaction history')
  }
}

export async function updateTransactionHistory(
  id: string,
  data: transactionHistory
) {
  try {
    const transactionHistory = await financeClient.transactionHistory.update({
      where: {
        id,
      },
      data,
    })
    return transactionHistory
  } catch (error) {
    throw new Error('Error updating transaction history')
  }
}

export async function deleteTransactionHistory(id: string) {
  try {
    const transactionHistory = await financeClient.transactionHistory.delete({
      where: {
        id,
      },
    })
    return transactionHistory
  } catch (error) {
    throw new Error('Error deleting transaction history')
  }
}

export async function getTransactionHistoryById(id: string) {
  try {
    const transactionHistory =
      await financeClient.transactionHistory.findUnique({
        where: {
          id,
        },
      })
    return transactionHistory
  } catch (error) {
    throw new Error('Error getting transaction history by id')
  }
}
