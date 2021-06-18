import { prisma } from '../db/prisma'
import { RequestHandler } from 'express'
import { MoveToCartInput } from '../validation'
import { Asserts } from 'yup'

export const GetCart: RequestHandler = async (req, res) => {
	const { user } = req.session

	try {
		const userCart = await prisma.user.findUnique({
			where: {
				email: user?.email,
			},
			select: {
				Cart: {
					select: {
						products: true,
					},
				},
			},
		})

		res.status(200).json({
			msg: "Here's your cart.",
			userCart,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong',
			code: 'ERROR_INTERNAL_ERROR',
		})
	}
}

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

interface MoveToWishlistInput extends Asserts<typeof MoveToCartInput> {}

export const MoveToWishlist: RequestHandler = async (req, res) => {
	const { user } = req.session

	const { cartId, wishlistId, productId } = req.body as MoveToWishlistInput

	const userWishlist = await prisma.wishlist.findUnique({
		where: {
			id: wishlistId,
		},
		include: {
			products: {
				select: {
					id: true,
				},
			},
		},
	})

	const userCart = await prisma.cart.findUnique({
		where: {
			id: cartId,
		},
		include: {
			products: {
				select: {
					id: true,
				},
			},
		},
	})

	userWishlist?.products.forEach((product) => {
		if (product.id === productId) {
			return res.json({
				msg: 'The product is already present in your wishlist.',
			})
		}
	})

	const updatedUserWishlist = await prisma.wishlist.update({
		where: {
			id: wishlistId,
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

	const updatedUserCart = await prisma.cart.update({
		where: {
			id: cartId,
		},
		data: {
			products: {
				disconnect: {
					id: productId,
				},
			},
		},
	})

	// wrape in try catch

	res.json({
		msg: 'Moved item from cart to wishlist.',
		updatedUserCart,
		updatedUserWishlist,
	})
}
