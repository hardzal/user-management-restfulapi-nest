/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_contact_id_fkey";

-- DropTable
DROP TABLE "address";

-- CreateTable
CREATE TABLE "addressess" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(100),
    "city" VARCHAR(100),
    "province" VARCHAR(100),
    "country" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(10) NOT NULL,
    "contact_id" INTEGER NOT NULL,

    CONSTRAINT "addressess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addressess" ADD CONSTRAINT "addressess_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
