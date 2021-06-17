import { prisma } from '../db/prisma'
import { RequestHandler } from 'express'
import { hashPassword, verifyPassword } from '../utils/util'
import { SignInInput, SignUpInput } from '../validation'
import type { Asserts } from 'yup'
import log from '../utils/logger'
import SecurePassword from 'secure-password'

interface SignUpInput extends Asserts<typeof SignUpInput> {}

export const SignUp: RequestHandler = async (req, res, next) => {
	const { firstName, lastName, email } = req.body as SignUpInput

	try {
		const exisitingUser = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (exisitingUser) {
			return res.status(200).json({
				msg: 'Given email address is already registered. Please use another one.',
				error_code: 'ERROR_EMAIL_TAKEN',
			})
		}

		const savedUser = await prisma.user.create({
			data: {
				email,
				hashedPassword: await hashPassword(req.body.password),
				lastName,
				firstName,
				Wishlist: {
					create: {},
				},
				Cart: {
					create: {},
				},
			},
			include: {
				Wishlist: true,
				Cart: true,
			},
		})

		const userInfo = {
			email: savedUser.email,
			lastName: savedUser.lastName,
			id: savedUser.id,
			firstName: savedUser.firstName,
			wishlist: savedUser.Wishlist,
			cart: savedUser.Cart,
		}

		req.session.user = userInfo

		res.status(200).json({
			msg: 'User registration successful.',
			userInfo,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong while creating your account. Please try again later.',
			error_code: 'ERROR_INTERNAL_ERROR',
		})
	}
}

interface SignInInput extends Asserts<typeof SignInInput> {}

export const SignIn: RequestHandler = async (req, res, next) => {
	const { email, password } = req.body as SignInInput

	try {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
			include: {
				Cart: {
					include: {
						products: true,
					},
				},
				Wishlist: {
					include: {
						products: true,
					},
				},
			},
		})

		if (!user) {
			return res.status(404).json({
				msg: 'Invalid Credentials. Please verify if email or password is correct.',
				error_code: 'ERROR_BAD_CREDS',
			})
		}

		const validPassword = await verifyPassword(user.hashedPassword, password)
		log.info({ validPassword })

		switch (validPassword) {
			case SecurePassword.VALID:
				const { email, id, firstName, lastName, Cart, Wishlist } = user

				const userInfo = { email, id, firstName, lastName, Cart, Wishlist }

				req.session.user = userInfo

				return res.status(200).json({
					msg: 'Signed in successfully.',
					userInfo,
				})
			case SecurePassword.INVALID:
				return res.status(400).json({
					msg: 'Invalid Password. Please enter correct password to signin.',
					error_code: 'ERROR_BAD_CREDS',
				})
			default:
				return res.status(400).json({
					msg: 'Invalid Password.',
					error_code: 'ERROR_BAD_CREDS',
				})
		}
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong while signing you in. Please try again later.',
			error_code: 'ERROR_INTERNAL_ERROR',
		})
	}
}

export const Logout: RequestHandler = async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				log.error(err)
				return res.status(400).json({
					msg: 'There was a problem logging out.',
				})
			}
		})
		res.json({ msg: 'Log out successful' })
		// this catch is only to suppress prisma warning. Actual intention is to destroy user session
	} catch (error) {
		res.status(200).json({
			msg: 'Logged out successfully !',
		})
	}
}

export const UserInfo: RequestHandler = async (req, res, next) => {
	const { user } = req.session
	res.status(200).json({
		user,
	})
}
