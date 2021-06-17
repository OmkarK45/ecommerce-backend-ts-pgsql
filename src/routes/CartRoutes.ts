import { Router } from 'express'
import {
	AddToCart,
	GetCart,
	RemoveFromCart,
} from '../controllers/CartController'

const router = Router()

// create lone get fx for gettin cart
router.route('/').get(GetCart)
router.route('/add-product').post(AddToCart)
router.route('/remove-product').post(RemoveFromCart)

export = router
