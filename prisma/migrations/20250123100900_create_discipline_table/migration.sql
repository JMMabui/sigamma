/*
  Warnings:

  - You are about to drop the column `disciplineId` on the `course` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "disciplines" (
    "codigo" TEXT NOT NULL PRIMARY KEY,
    "discipline_name" TEXT NOT NULL,
    "year_study" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "hcs" INTEGER NOT NULL,
    "credits" INTEGER NOT NULL,
    "discipline_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "course_id" TEXT,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "disciplines_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "course_name" TEXT NOT NULL,
    "course_description" TEXT,
    "course_duration" INTEGER NOT NULL,
    "level_course" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "total_vacancies" INTEGER NOT NULL,
    "available_vacancies" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_course" ("available_vacancies", "course_description", "course_duration", "course_name", "created_at", "id", "level_course", "period", "total_vacancies", "updated_at") SELECT "available_vacancies", "course_description", "course_duration", "course_name", "created_at", "id", "level_course", "period", "total_vacancies", "updated_at" FROM "course";
DROP TABLE "course";
ALTER TABLE "new_course" RENAME TO "course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
