import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import morganMiddleware from './lib/morgan'
import log from './lib/logger'
import { corsOptions } from './config/corsOptions'
dotenv.config()

const app: Application = express()

app.use(express.json())

app.use(cors(corsOptions))

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
