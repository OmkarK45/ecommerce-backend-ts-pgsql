import { CorsOptions } from 'cors'

export const corsOptions: CorsOptions = {
	origin: [process.env.REACT_APP_ORIGIN_DEV!],
	optionsSuccessStatus: 200,
	credentials: true,
}
