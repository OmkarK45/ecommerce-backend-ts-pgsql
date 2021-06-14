/*
  Warnings:

  - You are about to drop the `_ProductToWishlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToWishlist" DROP CONSTRAINT "_ProductToWishlist_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToWishlist" DROP CONSTRAINT "_ProductToWishlist_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "wishlistId" TEXT;

-- DropTable
DROP TABLE "_ProductToWishlist";

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
