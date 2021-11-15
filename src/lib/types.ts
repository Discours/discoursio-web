import type { User, Topic } from '../graphql/codegen'

export interface Shout {
	topics: Array<Partial<Topic>>
	authors: Array<Partial<User>>
	slug: string
	cover: string
	layout: string
	title: string
	subtitle: string
	views: number
	rating: number
	createdAt?: Date
}
