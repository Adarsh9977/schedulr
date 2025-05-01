/*
  Warnings:

  - The `status` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `day` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('pending', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('daily', 'weekly');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "day" "Day" NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "wakeTime" SET DATA TYPE TEXT,
ALTER COLUMN "sleepTime" SET DATA TYPE TEXT,
ALTER COLUMN "breakfast" SET DATA TYPE TEXT,
ALTER COLUMN "lunch" SET DATA TYPE TEXT,
ALTER COLUMN "dinner" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "dueDate" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'pending',
DROP COLUMN "type",
ADD COLUMN     "type" "TaskType" NOT NULL DEFAULT 'daily';
