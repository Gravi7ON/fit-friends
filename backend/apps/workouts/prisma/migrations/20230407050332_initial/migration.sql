/*
  Warnings:

  - Added the required column `cost` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOriginal` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Gym` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gym" ADD COLUMN     "cost" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "isOriginal" BOOLEAN NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
