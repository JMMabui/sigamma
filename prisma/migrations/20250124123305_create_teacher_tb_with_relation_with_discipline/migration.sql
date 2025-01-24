-- CreateTable
CREATE TABLE "teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "data_of_birth" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "provincy_address" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_disciplines" (
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
    "teacherId" TEXT,
    CONSTRAINT "disciplines_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "disciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teacher" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_disciplines" ("codigo", "course_id", "created_at", "credits", "discipline_name", "discipline_type", "hcs", "semester", "updated_at", "year_study") SELECT "codigo", "course_id", "created_at", "credits", "discipline_name", "discipline_type", "hcs", "semester", "updated_at", "year_study" FROM "disciplines";
DROP TABLE "disciplines";
ALTER TABLE "new_disciplines" RENAME TO "disciplines";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "teacher_email_key" ON "teacher"("email");
