import { financeClient } from '../../database/scrpt.finance'

interface discountSchema {
  invoiceId: string
  amount: number
  reason: string
}

export async function createDiscount({
  invoiceId,
  amount,
  reason,
}: discountSchema) {
  try {
    const discount = await financeClient.discount.create({
      data: {
        invoiceId,
        amount,
        reason,
      },
    })
    return discount
  } catch (error) {
    throw new Error('Error creating discount')
  }
}

export async function listAllDiscounts() {
  try {
    const discounts = await financeClient.discount.findMany()
    return discounts
  } catch (error) {
    throw new Error('Error listing discounts')
  }
}

export async function getDiscountById(id: string) {
  try {
    const discount = await financeClient.discount.findUnique({
      where: {
        id,
      },
    })
    return discount
  } catch (error) {
    throw new Error('Error getting discount by id')
  }
}

export async function updateDiscount(
  id: string,
  data: Partial<discountSchema>
) {
  try {
    const discount = await financeClient.discount.update({
      where: {
        id,
      },
      data,
    })
    return discount
  } catch (error) {
    throw new Error('Error updating discount')
  }
}

export async function deleteDiscount(id: string) {
  try {
    const discount = await financeClient.discount.delete({
      where: {
        id,
      },
    })
    return discount
  } catch (error) {
    throw new Error('Error deleting discount')
  }
}
