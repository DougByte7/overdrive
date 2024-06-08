-- CreateTable
CREATE TABLE "SRDCustomClass" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "proficiencies_armor" TEXT[],
    "proficiencies_weapon" TEXT[],
    "proficiencies_savingThrows" TEXT[],
    "proficiencies_skills" TEXT[],
    "proficiencies_skillAmount" INTEGER NOT NULL,
    "equipmentOptions" JSONB NOT NULL,
    "features" JSONB[],

    CONSTRAINT "SRDCustomClass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SRDCustomClass" ADD CONSTRAINT "SRDCustomClass_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
