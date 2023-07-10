-- CreateTable
CREATE TABLE "ApplicationSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "masterKeyUsed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ApplicationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Key" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Key_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Key_code_key" ON "Key"("code");
