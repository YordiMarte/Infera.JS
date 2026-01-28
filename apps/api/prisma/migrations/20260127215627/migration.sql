-- AlterTable
ALTER TABLE "CostSnapshot" ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "CostSnapshot" ADD CONSTRAINT "CostSnapshot_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
