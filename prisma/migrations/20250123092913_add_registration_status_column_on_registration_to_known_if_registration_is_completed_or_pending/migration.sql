/*
  Warnings:

  - Added the required column `registrationStatus` to the `registration` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "registrationStatus" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "registration_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "registration_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_registration" ("course_id", "created_at", "id", "student_id", "updated_at") SELECT "course_id", "created_at", "id", "student_id", "updated_at" FROM "registration";
DROP TABLE "registration";
ALTER TABLE "new_registration" RENAME TO "registration";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
