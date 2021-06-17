import { Router } from 'express'
import {
	AddProductToWishlist,
	RemoveProductFromWishlist,
} from '../controllers/WishlistController'

const router = Router()

router.route('/add-product').post(AddProductToWishlist)
router.route('/remove-product').post(RemoveProductFromWishlist)

export = router
