import { Router } from 'express'
import {
	AddToCart,
	GetCart,
	MoveToWishlist,
	RemoveFromCart,
} from '../controllers/CartController'
import { validate } from '../middlewares/ValidateMiddleware'
import { MoveToCartInput } from '../validation'

const router = Router()

// create lone get fx for gettin cart
router.route('/').get(GetCart)
router.route('/add-product').post(AddToCart)
router.route('/remove-product').post(RemoveFromCart)
router
	.route('/move-to-wishlist')
	.post(validate(MoveToCartInput), MoveToWishlist)
export = router
