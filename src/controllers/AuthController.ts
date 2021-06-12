import { prisma } from '../config/prisma'
import { RequestHandler } from 'express'
import { hashPassword, verifyPassword } from '../utils/util'
import { SignInInput, SignUpInput } from '../validation'
import type { Asserts } from 'yup'
import log from '../lib/logger'
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
			},
		})

		const userInfo = {
			email: savedUser.email,
			lastName: savedUser.lastName,
			id: savedUser.id,
			firstName: savedUser.firstName,
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
				const { email, id, firstName, lastName } = user

				const userInfo = { email, id, firstName, lastName }

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
	req.session.destroy((err) => {
		if (err) {
			return res.status(400).json({
				msg: 'There was a problem logging out.',
			})
		}
		res.json({ msg: 'Log out successful' })
	})
}
