import { PrismaClient } from '@prisma/client'
import log from '../src/lib/logger'
import { products } from './products'

const prisma = new PrismaClient()

export async function seed() {
	for (let product of products) {
		await prisma.product.create({
			data: product,
		})
	}
}

seed()
	.catch((e) => {
		log.error(e)
	})
	.finally(() => {
		prisma.$disconnect()
	})
