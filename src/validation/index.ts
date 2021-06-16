import * as yup from 'yup'

export const SignUpInput = yup.object({
	firstName: yup
		.string()
		.required('First name is required.')
		.max(50, 'First name should be less than 50 characters.'),
	lastName: yup.string().required('Last name is required.'),
	email: yup
		.string()
		.email('Email must be a valid email.')
		.required('Email is required.'),
	password: yup.string().min(6, 'Password must be atleast 6 characters long.'),
})

export const SignInInput = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
})

export const AddToWishlistInput = yup.object({
	productId: yup.string().required(),
	wishlistId: yup.string().required(),
})
