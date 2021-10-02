/*
  Warnings:

  - Added the required column `durationInSeconds` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'PROCESSING';

-- AlterTable
ALTER TABLE "ServerSession" ALTER COLUMN "expire" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "durationInSeconds" INTEGER NOT NULL;
