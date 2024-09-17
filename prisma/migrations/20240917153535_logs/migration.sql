/*
  Warnings:

  - You are about to drop the column `organization` on the `Logs` table. All the data in the column will be lost.
  - You are about to drop the column `project` on the `Logs` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('OTHER', 'MFA', 'RLS', 'PITR');

-- AlterTable
ALTER TABLE "Logs" DROP COLUMN "organization",
DROP COLUMN "project",
ADD COLUMN     "type" "LogType" NOT NULL DEFAULT 'OTHER';
