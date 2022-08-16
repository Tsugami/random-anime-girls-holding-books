-- CreateTable
CREATE TABLE "Image" (
    "path" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("path")
);
