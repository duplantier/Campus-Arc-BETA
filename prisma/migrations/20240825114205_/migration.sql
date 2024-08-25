-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "eduUsername" TEXT NOT NULL,
    "email" TEXT,
    "ethAddress" TEXT,
    "OCaccessToken" TEXT,
    "OCIdtoken" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcModule" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageSrc" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lessons" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "projects" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "ArcModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrationStake" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,
    "registeredArcModuleId" TEXT NOT NULL,

    CONSTRAINT "RegistrationStake_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArcModule" ADD CONSTRAINT "ArcModule_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationStake" ADD CONSTRAINT "RegistrationStake_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
