import { Router } from 'express'
import { GetAllProducts, GetOneProduct } from '../controllers/ProductController'

const router = Router()
// @TODO - use query params for category things
// router.route('/all-products').get(GetAllProducts)
// router.route('/:id').get(GetOneProduct)

export = router
