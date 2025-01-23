/*
  Warnings:

  - You are about to drop the `enrollment` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "course" ADD COLUMN "disciplineId" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "enrollment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "registration_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registration_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
