import { prisma } from '../db/prisma'
import { RequestHandler } from 'express'

export const GetAllProducts: RequestHandler = async (req, res, next) => {
	try {
		// @todo - add pagination later
		const allProducts = await prisma.product.findMany({})

		res.status(200).json({
			success: true,
			allProducts,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong while finding products.',
			error_code: 'ERROR_PRODUCTS_FAIL',
		})
	}
}

export const GetOneProduct: RequestHandler<{ id: string }, {}, {}> = async (
	req,
	res,
	next
) => {
	try {
		const { id } = req.params

		const product = await prisma.product.findFirst({
			where: {
				id,
			},
		})

		if (!product) {
			return res.status(404).json({
				msg: 'Requested product was not found on the server.',
				error_code: 'ERROR_PRODUCT_NOT_FOUND',
			})
		}

		res.status(200).json({
			product,
			success: true,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong while fetching that product.',
			error_code: 'ERROR_PRODUCT_FAIL',
		})
	}
}
