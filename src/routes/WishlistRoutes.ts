import { Router } from 'express'
import { AddProductToWishlist } from '../controllers/WishlistController'

const router = Router()
// change this to post
router.route('/add-product').post(AddProductToWishlist)

export = router
