import { financeClient } from '../../database/scrpt.finance'

interface tuitionFeeSchema {
  courseId: string
  amount: number
  year: number
  semester: number
}
export async function createTuitionFee({
  courseId,
  amount,
  year,
  semester,
}: tuitionFeeSchema) {
  try {
    const tuitionFee = await financeClient.tuitionFee.create({
      data: {
        courseId,
        amount,
        year,
        semester,
      },
    })
    return tuitionFee
  } catch (error) {
    throw new Error('Error creating tuition fee')
  }
}

export async function getTuitionFeeByCourseId(courseId: string) {
  try {
    const tuitionFee = await financeClient.tuitionFee.findMany({
      where: {
        courseId,
      },
    })
    return tuitionFee
  } catch (error) {
    throw new Error('Error getting tuition fee by course id')
  }
}

export async function getTuitionFeeByYearAndSemester(
  year: number,
  semester: number
) {
  try {
    const tuitionFee = await financeClient.tuitionFee.findMany({
      where: {
        year,
        semester,
      },
    })
    return tuitionFee
  } catch (error) {
    throw new Error('Error getting tuition fee by year and semester')
  }
}

export async function updateTuitionFee(
  id: string,
  data: Partial<tuitionFeeSchema>
) {
  try {
    const tuitionFee = await financeClient.tuitionFee.update({
      where: {
        id,
      },
      data,
    })
    return tuitionFee
  } catch (error) {
    throw new Error('Error updating tuition fee')
  }
}

export async function deleteTuitionFee(id: string) {
  try {
    const tuitionFee = await financeClient.tuitionFee.delete({
      where: {
        id,
      },
    })
    return tuitionFee
  } catch (error) {
    throw new Error('Error deleting tuition fee')
  }
}

export async function getTuitionFeeById(id: string) {
  try {
    const tuitionFee = await financeClient.tuitionFee.findUnique({
      where: {
        id,
      },
    })
    return tuitionFee
  } catch (error) {
    throw new Error('Error getting tuition fee by id')
  }
}
