import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morganMiddleware from './utils/morgan'
import log from './utils/logger'
import expressSession from 'express-session'
import { corsOptions } from './config/corsOptions'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import { prisma } from './db/prisma'
import { User } from '@prisma/client'

declare module 'express-session' {
	interface SessionData {
		user?: Omit<User, 'hashedPassword'>
		cookie: Cookie
	}
}

dotenv.config()

const app: Application = express()

app.use(express.json())

app.use(
	expressSession({
		cookie: {
			httpOnly: true,
			// make this rely on env thing.
			maxAge: 7 * 24 * 60 * 60 * 1000,
			secure: process.env.NODE_ENV === 'production' ? true : false,
		},
		secret: process.env.SESSION_SECRET!,
		store: new PrismaSessionStore(prisma, {
			checkPeriod: 2 * 60 * 1000, //ms
			dbRecordIdIsSessionId: true,
			dbRecordIdFunction: undefined,
		}),
		resave: false,
		saveUninitialized: false,
	})
)

app.use(cors(corsOptions))

app.use('/api/auth', require('./routes/AuthRoutes'))
app.use('/api/products', require('./routes/ProductRoutes'))
app.use('/api/wishlist', require('./routes/WishlistRoutes'))
app.use('/api/cart', require('./routes/CartRoutes'))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (process.env.NODE_ENV === 'development') {
		log.error(err.stack)
	}

	res.status(500).json({
		message: err.message,
	})
})

app.use((req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({
		msg: 'Requested resource was not found on the server.',
	})
	next()
})

app.use(morganMiddleware)

app.listen(process.env.PORT, () => {
	log.info(`🚀 Server Started on ${process.env.PORT}`)
	log.info(`Visit -> http://localhost:${process.env.PORT}`)
})

process.on('unhandledRejection', (error: Error) => {
	log.error(`❎ unhandledRejection : ${error} \n ErrorStack : ${error.stack}`)
})

process.on('uncaughtException', (error: Error) => {
	log.error(`❎ uncaughtException :  ${error.stack}`)
})
