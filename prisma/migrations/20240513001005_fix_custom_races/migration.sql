-- AlterTable
ALTER TABLE "SRDCustomRace" RENAME CONSTRAINT "SRDCustomClass_pkey" TO "SRDCustomRace_pkey";

-- RenameForeignKey
ALTER TABLE "SRDCustomRace" RENAME CONSTRAINT "SRDCustomClass_authorId_fkey" TO "SRDCustomRace_authorId_fkey";
