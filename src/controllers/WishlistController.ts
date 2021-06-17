import { RequestHandler } from 'express'
import { prisma } from '../db/prisma'

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

// remove product
