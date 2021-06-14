-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "productDescription" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "expressDelivery" BOOLEAN NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "reviewCount" INTEGER,
    "color" TEXT,
    "wishlistId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "offer" TEXT NOT NULL,
    "productId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_unique" ON "Wishlist"("userId");

-- AddForeignKey
ALTER TABLE "Product" ADD FOREIGN KEY ("wishlistId") REFERENCES "Wishlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
