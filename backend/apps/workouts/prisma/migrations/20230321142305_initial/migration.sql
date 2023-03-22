/*
  Warnings:

  - You are about to drop the column `cusromerId` on the `OrderGym` table. All the data in the column will be lost.
  - You are about to drop the column `cusromerId` on the `OrderWorkout` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `OrderGym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `OrderWorkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderGym" DROP COLUMN "cusromerId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderWorkout" DROP COLUMN "cusromerId",
ADD COLUMN     "customerId" TEXT NOT NULL;
