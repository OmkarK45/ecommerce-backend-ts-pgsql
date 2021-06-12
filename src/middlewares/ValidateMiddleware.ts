import { NextFunction, Request, Response } from 'express'
import { BaseSchema } from 'yup'
import { MixedSchema } from 'yup/lib/mixed'

export const validate =
	(schema: MixedSchema | BaseSchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const body = req.body
		try {
			await schema.validate(body, {
				abortEarly: false,
			})
			return next()
		} catch (error) {
			return res.status(400).json({
				error,
			})
		}
	}
