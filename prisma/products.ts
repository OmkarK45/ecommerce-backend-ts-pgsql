import { Product } from '.prisma/client'
import { Prisma } from '@prisma/client'

export const products: Omit<Product, 'id'>[] = [
	{
		brand: 'Asus',
		name: 'Asus Laptop G531',
		productDescription: 'A good laptop for family and work',
		image: 'https://m.media-amazon.com/images/I/51c+NXm8zLL._AC_SS450_.jpg',
		price: new Prisma.Decimal(999.99),
		color: null,
		expressDelivery: true,
		inStock: true,
		reviewCount: null,
		wishlistId: null,
	},
	{
		brand: 'Dell',
		name: 'Dell Laptop Inspiron',
		productDescription:
			'Budget Laptop to get work done in office and other apps.',
		image: 'https://m.media-amazon.com/images/I/51c+NXm8zLL._AC_SS450_.jpg',
		price: new Prisma.Decimal(999.99),
		color: null,
		expressDelivery: true,
		inStock: true,
		reviewCount: null,
		wishlistId: null,
	},
]
