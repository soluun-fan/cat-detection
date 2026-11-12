-- CreateTable
CREATE TABLE "photos" (
    "id" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "label" TEXT,
    "ground" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_runs" (
    "id" TEXT NOT NULL,
    "rounds" INTEGER NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "modelUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_runs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "photos_storagePath_key" ON "photos"("storagePath");
