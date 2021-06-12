import express from 'express'
import { register } from '../controllers/AuthController'
import { validate } from '../middlewares/ValidateMiddleware'
import { registerInput } from '../validation'

const router = express.Router()

router.route('/sign-up').post(validate(registerInput), register)

export = router
