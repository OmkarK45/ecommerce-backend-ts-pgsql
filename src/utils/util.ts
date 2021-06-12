import SecurePassword from 'secure-password'

const securePassword = new SecurePassword()

export async function hashPassword(password: string) {
	try {
		return await securePassword.hash(Buffer.from(password))
	} catch (err) {
		throw new Error('Error while hashing password' + err.message)
	}
}

export async function verifyPassword(hashedPassword: Buffer, password: string) {
	try {
		return await securePassword.verify(Buffer.from(password), hashedPassword)
	} catch (error) {
		console.log('ERROR IN VERIFY PASS', error)
		return SecurePassword.INVALID
	}
}
