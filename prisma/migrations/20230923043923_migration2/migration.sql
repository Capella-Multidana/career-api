/*
  Warnings:

  - You are about to drop the column `ethnicity` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `home_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ktp_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `relation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sibling_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `wa_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_image` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resume_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ethnicity",
DROP COLUMN "home_address",
DROP COLUMN "ktp_address",
DROP COLUMN "relation",
DROP COLUMN "religion",
DROP COLUMN "sibling_number",
DROP COLUMN "wa_number",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "education" TEXT NOT NULL,
ADD COLUMN     "profile_image" TEXT NOT NULL,
ADD COLUMN     "resume_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "application_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cover_letter" TEXT NOT NULL,
    "resume_url" TEXT NOT NULL,
    "jobsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobsId_fkey" FOREIGN KEY ("jobsId") REFERENCES "Jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
