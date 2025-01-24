-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student_discipline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'INSCRITO',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "student_discipline_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_discipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_student_discipline" ("created_at", "disciplineId", "id", "student_id", "updated_at") SELECT "created_at", "disciplineId", "id", "student_id", "updated_at" FROM "student_discipline";
DROP TABLE "student_discipline";
ALTER TABLE "new_student_discipline" RENAME TO "student_discipline";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
