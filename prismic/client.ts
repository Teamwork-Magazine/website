import Prismic from '@prismicio/client'
import { IncomingMessage } from 'node:http'
import { apiEndpoint, accessToken } from './config'

export function createClient(req?: IncomingMessage) {
	return Prismic.client(apiEndpoint, {
		...accessToken && { accessToken },
		...req && { req }
	})
}
