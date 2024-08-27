/*
  Warnings:

  - You are about to drop the column `arcDesignerId` on the `ArcModule` table. All the data in the column will be lost.
  - You are about to drop the column `lessons` on the `ArcModule` table. All the data in the column will be lost.
  - You are about to drop the column `OCIdtoken` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `_ArcModuleToStudent` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eduUsername]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ArcModule" DROP CONSTRAINT "ArcModule_arcDesignerId_fkey";

-- DropForeignKey
ALTER TABLE "RegistrationStake" DROP CONSTRAINT "RegistrationStake_studentId_fkey";

-- DropForeignKey
ALTER TABLE "_ArcModuleToStudent" DROP CONSTRAINT "_ArcModuleToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArcModuleToStudent" DROP CONSTRAINT "_ArcModuleToStudent_B_fkey";

-- AlterTable
ALTER TABLE "ArcDesigner" ADD COLUMN     "arcModulesIds" TEXT[];

-- AlterTable
ALTER TABLE "ArcModule" DROP COLUMN "arcDesignerId",
DROP COLUMN "lessons",
ADD COLUMN     "arcDesignersId" INTEGER[],
ADD COLUMN     "lessonNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lessonsIds" TEXT[],
ADD COLUMN     "studentsRegisteredIds" TEXT[],
ADD COLUMN     "whatYouWillLearn" TEXT[];

-- AlterTable
ALTER TABLE "RegistrationStake" ADD COLUMN     "collabStudentsId" TEXT[];

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "OCIdtoken",
ADD COLUMN     "registeredArcModulesIds" TEXT[],
ADD COLUMN     "registrationStakesIds" TEXT[];

-- DropTable
DROP TABLE "_ArcModuleToStudent";

-- CreateTable
CREATE TABLE "UsersArcModules" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "arcModuleId" INTEGER NOT NULL,
    "isRegistered" BOOLEAN NOT NULL,
    "completedLessonsIds" TEXT[],
    "isCollaborate" BOOLEAN NOT NULL,

    CONSTRAINT "UsersArcModules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoSrc" TEXT NOT NULL,
    "arcModuleId" INTEGER NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_eduUsername_key" ON "Student"("eduUsername");
