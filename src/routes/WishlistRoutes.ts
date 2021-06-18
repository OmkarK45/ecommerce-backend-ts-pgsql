import { Router } from 'express'
import {
	AddProductToWishlist,
	GetWishlist,
	MoveToCart,
	RemoveProductFromWishlist,
} from '../controllers/WishlistController'
import { validate } from '../middlewares/ValidateMiddleware'
import { MoveToCartInput } from '../validation'

const router = Router()
// TODO : add router to get only wishlist
router.route('/').get(GetWishlist)
router.route('/add-product').post(AddProductToWishlist)
router.route('/remove-product').post(RemoveProductFromWishlist)
router.route('/move-to-cart').post(validate(MoveToCartInput), MoveToCart)

export = router
