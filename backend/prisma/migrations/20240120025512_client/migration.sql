-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "coordenate_x" DOUBLE PRECISION NOT NULL,
    "coordenate_y" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
