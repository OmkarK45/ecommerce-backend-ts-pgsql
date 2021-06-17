import { Router } from 'express'
import {
	AddProductToWishlist,
	GetWishlist,
	RemoveProductFromWishlist,
} from '../controllers/WishlistController'

const router = Router()
// TODO : add router to get only wishlist
router.route('/').get(GetWishlist)
router.route('/add-product').post(AddProductToWishlist)
router.route('/remove-product').post(RemoveProductFromWishlist)

export = router
