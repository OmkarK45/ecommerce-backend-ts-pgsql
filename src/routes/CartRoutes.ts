import { Router } from 'express'
import { AddToCart } from '../controllers/CartController'

const router = Router()

// create lone get fx for gettin cart
router.route('/add-product').post(AddToCart)

export = router
