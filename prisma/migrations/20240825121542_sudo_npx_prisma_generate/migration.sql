/*
  Warnings:

  - The primary key for the `ArcModule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ArcModule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `studentId` column on the `ArcModule` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RegistrationStake` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RegistrationStake` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Student` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `studentId` on the `RegistrationStake` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `registeredArcModuleId` on the `RegistrationStake` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ArcModule" DROP CONSTRAINT "ArcModule_studentId_fkey";

-- DropForeignKey
ALTER TABLE "RegistrationStake" DROP CONSTRAINT "RegistrationStake_studentId_fkey";

-- AlterTable
ALTER TABLE "ArcModule" DROP CONSTRAINT "ArcModule_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER,
ADD CONSTRAINT "ArcModule_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RegistrationStake" DROP CONSTRAINT "RegistrationStake_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "studentId",
ADD COLUMN     "studentId" INTEGER NOT NULL,
DROP COLUMN "registeredArcModuleId",
ADD COLUMN     "registeredArcModuleId" INTEGER NOT NULL,
ADD CONSTRAINT "RegistrationStake_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Student" DROP CONSTRAINT "Student_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ArcModule" ADD CONSTRAINT "ArcModule_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationStake" ADD CONSTRAINT "RegistrationStake_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
