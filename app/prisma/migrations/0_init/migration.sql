-- CreateTable
CREATE TABLE "ReadingCompanionArchetypes" (
    "companionNumber" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "maxHP" INTEGER NOT NULL,
    "evolvesFrom" INTEGER NOT NULL DEFAULT -1,
    "evolvesTo" INTEGER NOT NULL DEFAULT -1,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ReadingCompanions" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "companionNumber" INTEGER NOT NULL,
    "love" INTEGER NOT NULL,
    "hunger" INTEGER NOT NULL,
    "hp" INTEGER NOT NULL,
    "customName" TEXT NOT NULL,
    "lastReadWith" DATETIME NOT NULL,
    "usersId" TEXT,
    CONSTRAINT "ReadingCompanions_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Books" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "usersId" TEXT,
    CONSTRAINT "Books_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookSections" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "_bookId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "_quizId" TEXT NOT NULL,
    "booksId" TEXT,
    CONSTRAINT "BookSections_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "Books" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BookProgresions" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "_bookId" TEXT NOT NULL,
    "_userId" TEXT NOT NULL,
    "_currentSection" TEXT NOT NULL,
    "lastRead" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "usersId" TEXT,
    CONSTRAINT "BookProgresions_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "_bookId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "QuizQuestions" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "quizzesId" TEXT,
    CONSTRAINT "QuizQuestions_quizzesId_fkey" FOREIGN KEY ("quizzesId") REFERENCES "Quizzes" ("_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuizScores" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "_userId" TEXT NOT NULL,
    "_quizId" TEXT NOT NULL,
    "score" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "DateTimeOfBirth" DATETIME NOT NULL,
    "profilePicture" INTEGER NOT NULL DEFAULT 1,
    "readingCompanionArchetypes" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ReadingCompanionArchetypes_companionNumber_key" ON "ReadingCompanionArchetypes"("companionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingCompanions__id_key" ON "ReadingCompanions"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReadingCompanions_companionNumber_key" ON "ReadingCompanions"("companionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Books__id_key" ON "Books"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "BookSections__id_key" ON "BookSections"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "BookProgresions__id_key" ON "BookProgresions"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "Quizzes__id_key" ON "Quizzes"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuizQuestions__id_key" ON "QuizQuestions"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "QuizScores__id_key" ON "QuizScores"("_id");

-- CreateIndex
CREATE UNIQUE INDEX "Users__id_key" ON "Users"("_id");

