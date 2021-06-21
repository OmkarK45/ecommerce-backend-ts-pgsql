import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
	origin: ['http://localhost:3000'],
	optionsSuccessStatus: 200,
	credentials: true,
	exposedHeaders: ['set-cookie'],
}
