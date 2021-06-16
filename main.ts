import { prisma } from './src/db/prisma'
import log from './src/utils/logger'
import { hashPassword } from './src/utils/util'

// async function createUser() {
// 	const user = await prisma.user.create({
// 		data: {
// 			email: 'john@gmail.com',
// 			firstName: 'John',
// 			lastName: 'Doe',
// 			hashedPassword: await hashPassword('123456'),
// 		},
// 	})
// 	log.info(user)
// }

// createUser()

// create product
async function createProduct() {
	const product = await prisma.product.create({
		data: {
			name: 'Samsung Galaxy S20++ Maximum',
		},
	})
	log.info(product)
}

// createProduct()

/**
 * 	Need to create wishlist first
 * */
async function createWishlist() {
	const user2 = await prisma.user.findUnique({
		where: {
			email: 'ok@gmail.com',
		},
	})
	const user = await prisma.user.update({
		where: {
			email: 'ok@gmail.com',
		},
		data: {
			wishlist: {
				connectOrCreate: {
					create: {},
					where: {
						id: user2?.id,
					},
				},
			},
		},
	})

	log.info(user)
}

// createWishlist()

// Get wishlist of a user
// async function getWishlist() {
// 	const user = await prisma.user.findUnique({
// 		where: {
// 			email: 'ok@gmail.com',
// 		},
// 		include: {
// 			wishlist: true,
// 		},
// 	})
// 	const wl = await prisma.wishlist.findUnique({
// 		where: {
// 			id: user?.wishlist?.id,
// 		},
// 		include: {
// 			products: true,
// 		},
// 	})
// 	log.info(user)
// 	log.info(wl)
// }

// getWishlist()

async function getWishlist() {
	const wl = await prisma.user.findUnique({
		where: {
			email: 'ok@gmail.com',
		},
		include: {
			wishlist: {
				include: {
					products: true,
				},
			},
		},
	})
	console.log(wl)
}
getWishlist()
