-- CreateTable
CREATE TABLE "Critter" (
    "_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Critter_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "UserCritter" (
    "_id" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "userId" TEXT NOT NULL,
    "critterId" TEXT NOT NULL,

    CONSTRAINT "UserCritter_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "UserCritter" ADD CONSTRAINT "UserCritter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCritter" ADD CONSTRAINT "UserCritter_critterId_fkey" FOREIGN KEY ("critterId") REFERENCES "Critter"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
