import { Router } from 'express'
import { GetAllProducts, GetOneProduct } from '../controllers/ProductController'

const router = Router()
// @TODO - use query params for category things
router.route('/all-products').get(GetAllProducts)
router.route('/:id').get(GetOneProduct)
// The name of the schema needs to be same for both cart and wishlist . its intentional and will be cahnged.

export = router
