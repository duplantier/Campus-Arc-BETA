/*
  Warnings:

  - You are about to drop the column `studentId` on the `ArcModule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArcModule" DROP CONSTRAINT "ArcModule_studentId_fkey";

-- AlterTable
ALTER TABLE "ArcModule" DROP COLUMN "studentId",
ADD COLUMN     "arcDesignerId" INTEGER;

-- CreateTable
CREATE TABLE "ArcDesigner" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "ArcDesigner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArcModuleToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArcModuleToStudent_AB_unique" ON "_ArcModuleToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_ArcModuleToStudent_B_index" ON "_ArcModuleToStudent"("B");

-- AddForeignKey
ALTER TABLE "ArcModule" ADD CONSTRAINT "ArcModule_arcDesignerId_fkey" FOREIGN KEY ("arcDesignerId") REFERENCES "ArcDesigner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArcModuleToStudent" ADD CONSTRAINT "_ArcModuleToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "ArcModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArcModuleToStudent" ADD CONSTRAINT "_ArcModuleToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
