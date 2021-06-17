import { Router } from 'express'
import {
	AddProductToWishlist,
	RemoveProductFromWishlist,
} from '../controllers/WishlistController'

const router = Router()
// TODO : add router to get only wishlist
router.route('/add-product').post(AddProductToWishlist)
router.route('/remove-product').post(RemoveProductFromWishlist)

export = router
