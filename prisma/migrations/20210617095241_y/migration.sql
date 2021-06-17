/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_tagId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "PostTags";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToWishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_unique" ON "Wishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToWishlist_AB_unique" ON "_ProductToWishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToWishlist_B_index" ON "_ProductToWishlist"("B");

-- AddForeignKey
ALTER TABLE "Wishlist" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToWishlist" ADD FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToWishlist" ADD FOREIGN KEY ("B") REFERENCES "Wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
