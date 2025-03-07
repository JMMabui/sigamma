/*
  Warnings:

  - You are about to drop the column `data_of_birth` on the `education_officer` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `student_discipline` table. All the data in the column will be lost.
  - You are about to drop the column `disciplineId` on the `teacher_discipline` table. All the data in the column will be lost.
  - Added the required column `date_of_birth` to the `education_officer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discipline_id` to the `student_discipline` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discipline_id` to the `students_classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discipline_id` to the `teacher_discipline` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pre_school" DROP CONSTRAINT "pre_school_student_id_fkey";

-- DropForeignKey
ALTER TABLE "registration" DROP CONSTRAINT "registration_course_id_fkey";

-- DropForeignKey
ALTER TABLE "registration" DROP CONSTRAINT "registration_student_id_fkey";

-- DropForeignKey
ALTER TABLE "student_discipline" DROP CONSTRAINT "student_discipline_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "student_discipline" DROP CONSTRAINT "student_discipline_student_id_fkey";

-- DropForeignKey
ALTER TABLE "students_classes" DROP CONSTRAINT "students_classes_student_id_fkey";

-- DropForeignKey
ALTER TABLE "teacher_discipline" DROP CONSTRAINT "teacher_discipline_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "teacher_discipline" DROP CONSTRAINT "teacher_discipline_teacher_id_fkey";

-- AlterTable
ALTER TABLE "education_officer" DROP COLUMN "data_of_birth",
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "student_discipline" DROP COLUMN "disciplineId",
ADD COLUMN     "discipline_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students_classes" ADD COLUMN     "discipline_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teacher_discipline" DROP COLUMN "disciplineId",
ADD COLUMN     "discipline_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pre_school" ADD CONSTRAINT "pre_school_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_discipline" ADD CONSTRAINT "student_discipline_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_discipline" ADD CONSTRAINT "student_discipline_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_discipline" ADD CONSTRAINT "teacher_discipline_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_discipline" ADD CONSTRAINT "teacher_discipline_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_classes" ADD CONSTRAINT "students_classes_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_classes" ADD CONSTRAINT "students_classes_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
