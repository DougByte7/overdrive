-- CreateTable
CREATE TABLE "SRDCustomClass" (
    "id" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "speed_land" INTEGER NOT NULL,
    "speed_climb" INTEGER NOT NULL,
    "speed_fly" INTEGER NOT NULL,
    "speed_swimming" INTEGER NOT NULL,
    "speed_burrow" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "darkvision" INTEGER NOT NULL,
    "traits" JSONB[],

    CONSTRAINT "SRDCustomClass_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SRDCustomClass" ADD CONSTRAINT "SRDCustomClass_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
