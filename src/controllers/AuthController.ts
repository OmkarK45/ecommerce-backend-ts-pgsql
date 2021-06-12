import { prisma } from '../config/prisma'
import { RequestHandler } from 'express'
import type { Asserts } from 'yup'
import { hashPassword } from '../utils/util'
import { registerInput } from '../validation'

interface RegisterInput extends Asserts<typeof registerInput> {}

export const register: RequestHandler = async (req, res, next) => {
	const { firstName, lastName, email } = req.body as RegisterInput

	if (!firstName || !lastName || !email || !req.body.password) {
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
	const user = await prisma.user.create({
		data: {
			email,
			hashedPassword: await hashPassword(req.body.password),
			lastName,
			firstName,
		},
	})
}
