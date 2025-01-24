-- CreateTable
CREATE TABLE "student_discipline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "disciplineId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "student_discipline_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_discipline_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines" ("codigo") ON DELETE RESTRICT ON UPDATE CASCADE
);
