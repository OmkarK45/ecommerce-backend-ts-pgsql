import express from 'express'
import { Logout, SignIn, SignUp, UserInfo } from '../controllers/AuthController'
import { SignInInput, SignUpInput } from '../validation'
import { validate } from '../middlewares/ValidateMiddleware'
import { requireAuth } from '../middlewares/AuthMiddleware'

const router = express.Router()

router.route('/sign-up').post(validate(SignUpInput), SignUp)
router.route('/sign-in').post(validate(SignInInput), SignIn)
router.route('/logout').post(Logout)
router.route('/user-info').get(requireAuth, UserInfo)
export = router
