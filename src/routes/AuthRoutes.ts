import express from 'express'
import { SignIn, SignUp } from '../controllers/AuthController'
import { SignInInput, SignUpInput } from '../validation'
import { validate } from '../middlewares/ValidateMiddleware'

const router = express.Router()

router.route('/sign-up').post(validate(SignUpInput), SignUp)
router.route('/sign-in').post(validate(SignInInput), SignIn)
export = router
