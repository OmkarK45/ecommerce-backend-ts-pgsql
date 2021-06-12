import * as yup from 'yup'

export const registerInput = yup.object({
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
