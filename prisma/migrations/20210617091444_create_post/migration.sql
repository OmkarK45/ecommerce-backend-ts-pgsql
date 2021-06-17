/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wishlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProductToWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wishlist" DROP CONSTRAINT "Wishlist_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToWishlist" DROP CONSTRAINT "_ProductToWishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToWishlist" DROP CONSTRAINT "_ProductToWishlist_B_fkey";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Wishlist";

-- DropTable
DROP TABLE "_ProductToWishlist";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostTags" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER,
    "tagId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag.name_unique" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "PostTags" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTags" ADD FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
