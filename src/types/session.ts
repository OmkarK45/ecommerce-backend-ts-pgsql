import expressSession from 'express-session'
declare module 'express-session' {
	interface Session {
		views: number
		cookie: Cookie
	}
}
