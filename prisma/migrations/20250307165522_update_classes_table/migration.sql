/*
  Warnings:

  - You are about to drop the column `description` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the `students_classes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `semester` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year_study` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "students_classes" DROP CONSTRAINT "students_classes_class_id_fkey";

-- DropForeignKey
ALTER TABLE "students_classes" DROP CONSTRAINT "students_classes_discipline_id_fkey";

-- DropForeignKey
ALTER TABLE "students_classes" DROP CONSTRAINT "students_classes_student_id_fkey";

-- AlterTable
ALTER TABLE "classes" DROP COLUMN "description",
ADD COLUMN     "semester" "Semester" NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL,
ADD COLUMN     "year_study" "YearStudy" NOT NULL;

-- AlterTable
ALTER TABLE "disciplines" ADD COLUMN     "classesId" TEXT;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "classesId" TEXT;

-- DropTable
DROP TABLE "students_classes";

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disciplines" ADD CONSTRAINT "disciplines_classesId_fkey" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
