-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_userId_fkey";

-- AlterTable
ALTER TABLE "project" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
