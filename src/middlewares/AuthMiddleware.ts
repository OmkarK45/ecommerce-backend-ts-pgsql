import { RequestHandler } from 'express'

export const requireAuth: RequestHandler = async (req, res, next) => {
	const { user } = req.session
	if (!user) {
		return res.status(401).json({
			msg: 'You are unauthorized to access this resource.',
			error_code: 'ERROR_UNAUTHORIZED',
		})
	}
	next()
}
