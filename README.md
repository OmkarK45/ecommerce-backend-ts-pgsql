- [x] - Setup basic express server
- [x] - add cookie parser and auth
- [x] - add auth middleware
- [x] - add user sign up and login flow

- [] - Add product, wishlist model to prisma
- [] - add controllers for product and wishlist endpoints
- [] - add CRUD for wishlist
- [] - Tie up auth to frontend

Modelling DB

- Product
- Wishlist
- User

- A user can have only one wishlist
- A wishlist can have multiple products

Routes config

- [x]- api/products/all-products - Returns a JSON of all products
- [x]- api/products/835c6ee4-1e43-4d05-8d46-193087d66731 - Returns a specific product
- [] - api/products?category=electronics - Retuns electronic products

For wishlists thing.

- [x] - api/wishlist/
- [x] - api/wishlist/add-product
- [x] - api/wishlist/remove-product

For cart thing

- [x] - api/cart
- [x] - api/cart/add-product
- [x] - api/cart/remove-product

- Additional Controllers
- [] - api/cart/move-to-wishlist
- [] - api/wishlist/move-to-cart

  I need to think if I need to create wishlist and cart for the user as well.
