import { prisma } from './src/db/prisma'
import log from './src/utils/logger'
import { hashPassword } from './src/utils/util'

async function createUser() {
	const user = await prisma.user.create({
		data: {
			email: 'dan.abramov@gmail.com',
			firstName: 'Dan',
			lastName: 'Abramov',
			hashedPassword: await hashPassword('123456'),
			Wishlist: {
				create: {},
			},
		},
	})
	log.info(user)
}

// createUser()

// create product
async function createProduct() {
	const product = await prisma.product.create({
		data: {
			name: 'Redmi Iphone Copy',
			price: 50,
		},
	})
	log.info(product)
}

// createProduct()

// /**
//  * 	Need to create wishlist first
//  * */
async function createWishlist() {
	// const user2 = await prisma.user.findUnique({
	// 	where: {
	// 		email: 'ok@gmail.com',
	// 	},
	// })
	const user = await prisma.user.update({
		where: {
			email: 'ok@gmail.com',
		},
		data: {
			Wishlist: {
				create: {},
			},
		},
	})

	log.info(user)
}

// createWishlist()

// // Get wishlist of a user
// // async function getWishlist() {
// // 	const user = await prisma.user.findUnique({
// // 		where: {
// // 			email: 'ok@gmail.com',
// // 		},
// // 		include: {
// // 			wishlist: true,
// // 		},
// // 	})
// // 	const wl = await prisma.wishlist.findUnique({
// // 		where: {
// // 			id: user?.wishlist?.id,
// // 		},
// // 		include: {
// // 			products: true,
// // 		},
// // 	})
// // 	log.info(user)
// // 	log.info(wl)
// // }

// // getWishlist()

// async function getWishlist() {
// 	const wl = await prisma.user.findUnique({
// 		where: {
// 			email: 'ok@gmail.com',
// 		},
// 		include: {
// 			wishlist: {
// 				include: {
// 					products: true,
// 				},
// 			},
// 		},
// 	})
// 	console.log(wl)
// }
// // getWishlist()

async function addProductToUserWishlist() {
	const user = await prisma.user.findUnique({
		where: {
			email: 'john@gmail.com',
		},
		include: {
			Wishlist: {
				include: {
					products: true,
				},
			},
		},
	})

	// const updatedWl2 = await prisma.wishlist.update({
	// 	where: {
	// 		id: '11bfdab9-4798-4e73-bf6f-42800ae8c44d',
	// 	},
	// 	data: {
	// 		products: {
	// 			connect: {
	// 				id: '115ce085-0fd7-4b8a-a5c8-49965cfb4257',
	// 			},
	// 		},
	// 	},
	// })

	// const updatedWl = await prisma.wishlist.findUnique({
	// 	where: {
	// 		id: '11bfdab9-4798-4e73-bf6f-42800ae8c44d',
	// 	},
	// 	include: {
	// 		products: true,
	// 	},
	// })

	// log.info(updatedWl)
	// log.info(updatedWl2)
	log.info(user)
}

// addProductToUserWishlist()

async function removeProductfromWishlist() {
	const updatedWl2 = await prisma.wishlist.update({
		where: {
			id: '11bfdab9-4798-4e73-bf6f-42800ae8c44d',
		},
		data: {
			products: {
				disconnect: {
					id: '115ce085-0fd7-4b8a-a5c8-49965cfb4257',
				},
			},
		},
	})
	const updatedWl = await prisma.wishlist.findUnique({
		where: {
			id: '11bfdab9-4798-4e73-bf6f-42800ae8c44d',
		},
		include: {
			products: true,
		},
	})
	log.info(updatedWl)
	log.info(updatedWl2)
}

removeProductfromWishlist()
