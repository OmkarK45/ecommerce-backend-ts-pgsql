import { prisma } from '../config/prisma'
import { RequestHandler } from 'express'

interface RegisterBody {
	firstName: string
	lastName: string
	email: string
	password: string
}
// add zod validation here.
export const register: RequestHandler = async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body as RegisterBody

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({
			msg: 'Please make sure you have filled all fields.',
			error_code: 'ERROR_BAD_REQUEST',
		})
	}

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
}
