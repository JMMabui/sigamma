-- CreateTable
CREATE TABLE "acess_data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "student_id" TEXT NOT NULL,
    CONSTRAINT "acess_data_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "surname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dataOfBirth" DATETIME NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "provincyAddress" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "documentIssuedAt" DATETIME NOT NULL,
    "documentExpiredAt" DATETIME NOT NULL,
    "nuit" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "educationOfficerId" TEXT,
    CONSTRAINT "student_educationOfficerId_fkey" FOREIGN KEY ("educationOfficerId") REFERENCES "education_officer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pre_school" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "school_level" TEXT NOT NULL,
    "school_name" TEXT NOT NULL,
    "school_provincy" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "student_id" TEXT NOT NULL,
    CONSTRAINT "pre_school_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "education_officer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "data_of_birth" DATETIME NOT NULL,
    "email" TEXT,
    "contact" TEXT NOT NULL,
    "provincy_address" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "course" (
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

-- CreateTable
CREATE TABLE "enrollment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "acess_data_email_key" ON "acess_data"("email");

-- CreateIndex
CREATE UNIQUE INDEX "education_officer_email_key" ON "education_officer"("email");
