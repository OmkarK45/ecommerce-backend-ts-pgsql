import { prisma } from '../db/prisma'
import { RequestHandler } from 'express'

interface AddToCartInput {
	productId: string
}
export const AddToCart: RequestHandler = async (req, res) => {
	const { user } = req.session

	const { productId } = req.body as AddToCartInput

	try {
		const userCart = await prisma.user.findUnique({
			where: {
				email: user?.email,
			},
			include: {
				Cart: true,
			},
		})

		const updatedUserCart = await prisma.cart.update({
			where: {
				id: userCart?.Cart?.id,
			},
			data: {
				products: {
					connect: {
						id: productId,
					},
				},
			},
			include: {
				products: true,
			},
		})

		res.status(200).json({
			msg: 'Product added to your cart.',
			updatedUserCart,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong',
			code: 'ERROR_INTERNAL_ERROR',
		})
	}
}

interface RemoveFromCartInput {
	productId: string
}

export const RemoveFromCart: RequestHandler = async (req, res) => {
	const { user } = req.session

	const { productId } = req.body as RemoveFromCartInput

	try {
		const userCart = await prisma.user.findUnique({
			where: {
				email: user?.email,
			},
			include: {
				Cart: true,
			},
		})

		const updatedUserCart = await prisma.cart.update({
			where: {
				id: userCart?.Cart?.id,
			},
			data: {
				products: {
					disconnect: {
						id: productId,
					},
				},
			},
			include: {
				products: true,
			},
		})

		res.status(200).json({
			msg: 'Product removed from your cart.',
			updatedUserCart,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong',
			code: 'ERROR_INTERNAL_ERROR',
		})
	}
}
