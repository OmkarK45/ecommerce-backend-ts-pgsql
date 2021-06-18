import { RequestHandler } from 'express'
import { Asserts } from 'yup'
import { prisma } from '../db/prisma'
import { MoveToCartInput } from '../validation'

export const GetWishlist: RequestHandler = async (req, res) => {
	const { user } = req.session

	try {
		const userWishlist = await prisma.user.findUnique({
			where: {
				email: user?.email,
			},
			select: {
				Wishlist: {
					select: {
						products: true,
					},
				},
			},
		})

		res.status(200).json({
			msg: "Here's your wishlist.",
			userWishlist,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong',
			code: 'ERROR_INTERNAL_ERROR',
		})
	}
}

// Todo -> verify and typecheck for the body
interface AddProductToWishlistInput {
	productId: string
}

// add product
export const AddProductToWishlist: RequestHandler = async (req, res) => {
	const { user } = req.session

	const { productId } = req.body as AddProductToWishlistInput

	try {
		const userWishlist = await prisma.user.findUnique({
			where: {
				email: user?.email,
			},
			include: {
				Wishlist: true,
			},
		})

		const updatedUserWishlist = await prisma.wishlist.update({
			where: {
				id: userWishlist?.Wishlist?.id,
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
			msg: 'Product added to your wishlist.',
			updatedUserWishlist,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong',
			code: 'ERROR_INTERNAL_ERROR',
		})
	}
}

interface RemoveProductFromWishlistInput {
	productId: string
}
// remove product
export const RemoveProductFromWishlist: RequestHandler = async (req, res) => {
	const { user } = req.session

	const { productId } = req.body as RemoveProductFromWishlistInput

	try {
		const userWishlist = await prisma.user.findUnique({
			where: {
				email: user?.email,
			},
			include: {
				Wishlist: true,
			},
		})

		const updatedUserWishlist = await prisma.wishlist.update({
			where: {
				id: userWishlist?.Wishlist?.id,
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
			msg: 'Product removed from your wishlist.',
			updatedUserWishlist,
		})
	} catch (error) {
		res.status(500).json({
			msg: 'Something went wrong',
			code: 'ERROR_INTERNAL_ERROR',
		})
	}
}

interface MoveToCartInput extends Asserts<typeof MoveToCartInput> {}

export const MoveToCart: RequestHandler = async (req, res) => {
	const { user } = req.session

	const { productId, cartId, wishlistId } = req.body as MoveToCartInput

	// how move to cart works
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
	// Future -> this could be better considering number of products one can have.

	userCart?.products.forEach((product) => {
		if (product.id === productId) {
			return res.json({
				msg: 'The product is already present in your cart.',
			})
		}
	})

	const updatedCart = await prisma.cart.update({
		where: {
			id: cartId,
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

	res.json({
		userCart,
		userWishlist,
		updatedCart,
	})
}
