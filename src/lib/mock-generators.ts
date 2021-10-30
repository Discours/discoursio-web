/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/no-unused-vars,no-prototype-builtins */
import type {
	AuthResult,
	Comment,
	CommentRating,
	Community,
	Message,
	MessageResult,
	Mutation,
	Notification,
	ProfileInput,
	Proposal,
	Query,
	Rating,
	Result,
	Role,
	Shout,
	ShoutInput,
	ShoutResult,
	Subscription,
	Token,
	Topic,
	User,
	UserNotification,
	UserResult,
} from '../graphql/codegen'

export const anAuthResult = (overrides?: Partial<AuthResult>): AuthResult => {
	return {
		error:
			overrides && overrides.hasOwnProperty('error')
				? overrides.error!
				: 'accusamus',
		token:
			overrides && overrides.hasOwnProperty('token')
				? overrides.token!
				: 'provident',
		user:
			overrides && overrides.hasOwnProperty('user') ? overrides.user! : aUser(),
	}
}

export const aComment = (overrides?: Partial<Comment>): Comment => {
	return {
		author:
			overrides && overrides.hasOwnProperty('author') ? overrides.author! : 6697,
		body: overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'et',
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'corrupti quibusdam non cupiditate minima ipsum quis',
		deletedAt:
			overrides && overrides.hasOwnProperty('deletedAt')
				? overrides.deletedAt!
				: 'magnam sint quia voluptas debitis atque eum',
		deletedBy:
			overrides && overrides.hasOwnProperty('deletedBy')
				? overrides.deletedBy!
				: 2619,
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 4521,
		old_id:
			overrides && overrides.hasOwnProperty('old_id')
				? overrides.old_id!
				: 'commodi',
		old_thread:
			overrides && overrides.hasOwnProperty('old_thread')
				? overrides.old_thread!
				: 'corrupti',
		ratigns:
			overrides && overrides.hasOwnProperty('ratigns')
				? overrides.ratigns!
				: [aCommentRating()],
		rating:
			overrides && overrides.hasOwnProperty('rating') ? overrides.rating! : 1579,
		replyTo:
			overrides && overrides.hasOwnProperty('replyTo') ? overrides.replyTo! : 1576,
		shout:
			overrides && overrides.hasOwnProperty('shout') ? overrides.shout! : 8593,
		updatedAt:
			overrides && overrides.hasOwnProperty('updatedAt')
				? overrides.updatedAt!
				: 'et illum velit nemo molestiae quam ut',
		views:
			overrides && overrides.hasOwnProperty('views') ? overrides.views! : 6442,
	}
}

export const aCommentRating = (
	overrides?: Partial<CommentRating>
): CommentRating => {
	return {
		comment_id:
			overrides && overrides.hasOwnProperty('comment_id')
				? overrides.comment_id!
				: 377,
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'mollitia doloribus voluptas velit aperiam voluptates voluptatem',
		createdBy:
			overrides && overrides.hasOwnProperty('createdBy')
				? overrides.createdBy!
				: 1768,
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 5579,
		value:
			overrides && overrides.hasOwnProperty('value') ? overrides.value! : 6049,
	}
}

export const aCommunity = (overrides?: Partial<Community>): Community => {
	return {
		desc: overrides && overrides.hasOwnProperty('desc') ? overrides.desc! : 'in',
		name:
			overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'tempore',
		pic: overrides && overrides.hasOwnProperty('pic') ? overrides.pic! : 'sit',
		slug:
			overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'labore',
	}
}

export const aMessage = (overrides?: Partial<Message>): Message => {
	return {
		author:
			overrides && overrides.hasOwnProperty('author') ? overrides.author! : 7061,
		body:
			overrides && overrides.hasOwnProperty('body')
				? overrides.body!
				: 'molestiae',
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'rerum consectetur mollitia illum laborum nobis sed',
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 8448,
		replyTo:
			overrides && overrides.hasOwnProperty('replyTo') ? overrides.replyTo! : 4733,
		updatedAt:
			overrides && overrides.hasOwnProperty('updatedAt')
				? overrides.updatedAt!
				: 'nihil ducimus voluptas id quo qui et',
		visibleForUsers:
			overrides && overrides.hasOwnProperty('visibleForUsers')
				? overrides.visibleForUsers!
				: [7276],
	}
}

export const aMessageResult = (
	overrides?: Partial<MessageResult>
): MessageResult => {
	return {
		error:
			overrides && overrides.hasOwnProperty('error') ? overrides.error! : 'illo',
		message:
			overrides && overrides.hasOwnProperty('message')
				? overrides.message!
				: aMessage(),
	}
}

export const aMutation = (overrides?: Partial<Mutation>): Mutation => {
	return {
		confirmEmail:
			overrides && overrides.hasOwnProperty('confirmEmail')
				? overrides.confirmEmail!
				: anAuthResult(),
		confirmPasswordReset:
			overrides && overrides.hasOwnProperty('confirmPasswordReset')
				? overrides.confirmPasswordReset!
				: true,
		createMessage:
			overrides && overrides.hasOwnProperty('createMessage')
				? overrides.createMessage!
				: aMessageResult(),
		createShout:
			overrides && overrides.hasOwnProperty('createShout')
				? overrides.createShout!
				: aShoutResult(),
		deleteMessage:
			overrides && overrides.hasOwnProperty('deleteMessage')
				? overrides.deleteMessage!
				: aResult(),
		deleteShout:
			overrides && overrides.hasOwnProperty('deleteShout')
				? overrides.deleteShout!
				: aResult(),
		rateShout:
			overrides && overrides.hasOwnProperty('rateShout')
				? overrides.rateShout!
				: aResult(),
		registerUser:
			overrides && overrides.hasOwnProperty('registerUser')
				? overrides.registerUser!
				: anAuthResult(),
		requestPasswordReset:
			overrides && overrides.hasOwnProperty('requestPasswordReset')
				? overrides.requestPasswordReset!
				: false,
		updateMessage:
			overrides && overrides.hasOwnProperty('updateMessage')
				? overrides.updateMessage!
				: aMessageResult(),
		updateProfile:
			overrides && overrides.hasOwnProperty('updateProfile')
				? overrides.updateProfile!
				: aResult(),
		updateShout:
			overrides && overrides.hasOwnProperty('updateShout')
				? overrides.updateShout!
				: aShoutResult(),
		viewShout:
			overrides && overrides.hasOwnProperty('viewShout')
				? overrides.viewShout!
				: aResult(),
	}
}

export const aNotification = (
	overrides?: Partial<Notification>
): Notification => {
	return {
		kind:
			overrides && overrides.hasOwnProperty('kind') ? overrides.kind! : 'odit',
		template:
			overrides && overrides.hasOwnProperty('template')
				? overrides.template!
				: 'occaecati',
		variables:
			overrides && overrides.hasOwnProperty('variables')
				? overrides.variables!
				: ['quia'],
	}
}

export const aProfileInput = (
	overrides?: Partial<ProfileInput>
): ProfileInput => {
	return {
		email:
			overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'velit',
		username:
			overrides && overrides.hasOwnProperty('username')
				? overrides.username!
				: 'earum',
		userpic:
			overrides && overrides.hasOwnProperty('userpic')
				? overrides.userpic!
				: 'excepturi',
	}
}

export const aProposal = (overrides?: Partial<Proposal>): Proposal => {
	return {
		author:
			overrides && overrides.hasOwnProperty('author') ? overrides.author! : 7060,
		body:
			overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'quaerat',
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'aut rerum cupiditate voluptas iure delectus deserunt',
		range:
			overrides && overrides.hasOwnProperty('range')
				? overrides.range!
				: 'explicabo',
		shout:
			overrides && overrides.hasOwnProperty('shout') ? overrides.shout! : 7126,
	}
}

export const aQuery = (overrides?: Partial<Query>): Query => {
	return {
		favoritesShouts:
			overrides && overrides.hasOwnProperty('favoritesShouts')
				? overrides.favoritesShouts!
				: [aShout()],
		getCurrentUser:
			overrides && overrides.hasOwnProperty('getCurrentUser')
				? overrides.getCurrentUser!
				: aUserResult(),
		getMessages:
			overrides && overrides.hasOwnProperty('getMessages')
				? overrides.getMessages!
				: [aMessage()],
		getShoutBySlug:
			overrides && overrides.hasOwnProperty('getShoutBySlug')
				? overrides.getShoutBySlug!
				: aShout(),
		getUserBySlug:
			overrides && overrides.hasOwnProperty('getUserBySlug')
				? overrides.getUserBySlug!
				: aUserResult(),
		isEmailFree:
			overrides && overrides.hasOwnProperty('isEmailFree')
				? overrides.isEmailFree!
				: aResult(),
		signIn:
			overrides && overrides.hasOwnProperty('signIn')
				? overrides.signIn!
				: anAuthResult(),
		signOut:
			overrides && overrides.hasOwnProperty('signOut')
				? overrides.signOut!
				: aResult(),
		topAuthors:
			overrides && overrides.hasOwnProperty('topAuthors')
				? overrides.topAuthors!
				: [aUser()],
		topShoutsByRating:
			overrides && overrides.hasOwnProperty('topShoutsByRating')
				? overrides.topShoutsByRating!
				: [aShout()],
		topShoutsByView:
			overrides && overrides.hasOwnProperty('topShoutsByView')
				? overrides.topShoutsByView!
				: [aShout()],
	}
}

export const aRating = (overrides?: Partial<Rating>): Rating => {
	return {
		createdBy:
			overrides && overrides.hasOwnProperty('createdBy')
				? overrides.createdBy!
				: 222,
		value:
			overrides && overrides.hasOwnProperty('value') ? overrides.value! : 629,
	}
}

export const aResult = (overrides?: Partial<Result>): Result => {
	return {
		error:
			overrides && overrides.hasOwnProperty('error')
				? overrides.error!
				: 'mollitia',
	}
}

export const aRole = (overrides?: Partial<Role>): Role => {
	return {
		community:
			overrides && overrides.hasOwnProperty('community')
				? overrides.community!
				: 9348,
		desc:
			overrides && overrides.hasOwnProperty('desc') ? overrides.desc! : 'fugit',
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 3056,
		name:
			overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'quod',
		permissions:
			overrides && overrides.hasOwnProperty('permissions')
				? overrides.permissions!
				: [561],
	}
}

export const aShout = (overrides?: Partial<Shout>): Shout => {
	return {
		authors:
			overrides && overrides.hasOwnProperty('authors')
				? overrides.authors!
				: [aUser()],
		body:
			overrides && overrides.hasOwnProperty('body')
				? overrides.body!
				: 'consectetur',
		comments:
			overrides && overrides.hasOwnProperty('comments')
				? overrides.comments!
				: [aComment()],
		community:
			overrides && overrides.hasOwnProperty('community')
				? overrides.community!
				: 4600,
		cover:
			overrides && overrides.hasOwnProperty('cover')
				? overrides.cover!
				: 'explicabo',
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'voluptas sit beatae et modi pariatur laboriosam',
		deletedAt:
			overrides && overrides.hasOwnProperty('deletedAt')
				? overrides.deletedAt!
				: 'quia iste deleniti deleniti sed id molestiae',
		deletedBy:
			overrides && overrides.hasOwnProperty('deletedBy')
				? overrides.deletedBy!
				: 3287,
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 9887,
		layout:
			overrides && overrides.hasOwnProperty('layout')
				? overrides.layout!
				: 'illum',
		old_id:
			overrides && overrides.hasOwnProperty('old_id') ? overrides.old_id! : 'odio',
		publishedAt:
			overrides && overrides.hasOwnProperty('publishedAt')
				? overrides.publishedAt!
				: 'ut autem aut aut ut suscipit ut',
		publishedBy:
			overrides && overrides.hasOwnProperty('publishedBy')
				? overrides.publishedBy!
				: 6862,
		ratigns:
			overrides && overrides.hasOwnProperty('ratigns')
				? overrides.ratigns!
				: [aRating()],
		rating:
			overrides && overrides.hasOwnProperty('rating') ? overrides.rating! : 1631,
		replyTo:
			overrides && overrides.hasOwnProperty('replyTo')
				? overrides.replyTo!
				: aShout(),
		slug: overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'est',
		subtitle:
			overrides && overrides.hasOwnProperty('subtitle')
				? overrides.subtitle!
				: 'aut',
		tags:
			overrides && overrides.hasOwnProperty('tags')
				? overrides.tags!
				: ['molestias'],
		title:
			overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'fugit',
		topics:
			overrides && overrides.hasOwnProperty('topics')
				? overrides.topics!
				: ['aut'],
		updatedAt:
			overrides && overrides.hasOwnProperty('updatedAt')
				? overrides.updatedAt!
				: 'tempora et rerum consequatur eum libero facere',
		updatedBy:
			overrides && overrides.hasOwnProperty('updatedBy')
				? overrides.updatedBy!
				: 6373,
		versionOf:
			overrides && overrides.hasOwnProperty('versionOf')
				? overrides.versionOf!
				: aShout(),
		views:
			overrides && overrides.hasOwnProperty('views') ? overrides.views! : 4372,
		visibleFor:
			overrides && overrides.hasOwnProperty('visibleFor')
				? overrides.visibleFor!
				: [aUser()],
	}
}

export const aShoutInput = (overrides?: Partial<ShoutInput>): ShoutInput => {
	return {
		body:
			overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'quis',
		replyTo:
			overrides && overrides.hasOwnProperty('replyTo')
				? overrides.replyTo!
				: 'maxime',
		slug: overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'hic',
		subtitle:
			overrides && overrides.hasOwnProperty('subtitle')
				? overrides.subtitle!
				: 'vel',
		tags:
			overrides && overrides.hasOwnProperty('tags') ? overrides.tags! : ['ut'],
		title:
			overrides && overrides.hasOwnProperty('title') ? overrides.title! : 'minus',
		topics:
			overrides && overrides.hasOwnProperty('topics') ? overrides.topics! : [6723],
		versionOf:
			overrides && overrides.hasOwnProperty('versionOf')
				? overrides.versionOf!
				: 'voluptate',
		visibleForRoles:
			overrides && overrides.hasOwnProperty('visibleForRoles')
				? overrides.visibleForRoles!
				: ['praesentium'],
		visibleForUsers:
			overrides && overrides.hasOwnProperty('visibleForUsers')
				? overrides.visibleForUsers!
				: [923],
	}
}

export const aShoutResult = (overrides?: Partial<ShoutResult>): ShoutResult => {
	return {
		error:
			overrides && overrides.hasOwnProperty('error') ? overrides.error! : 'animi',
		shout:
			overrides && overrides.hasOwnProperty('shout') ? overrides.shout! : aShout(),
	}
}

export const aSubscription = (
	overrides?: Partial<Subscription>
): Subscription => {
	return {
		messageCreated:
			overrides && overrides.hasOwnProperty('messageCreated')
				? overrides.messageCreated!
				: aMessage(),
		messageDeleted:
			overrides && overrides.hasOwnProperty('messageDeleted')
				? overrides.messageDeleted!
				: aMessage(),
		messageUpdated:
			overrides && overrides.hasOwnProperty('messageUpdated')
				? overrides.messageUpdated!
				: aMessage(),
		onlineUpdated:
			overrides && overrides.hasOwnProperty('onlineUpdated')
				? overrides.onlineUpdated!
				: [aUser()],
		shoutUpdated:
			overrides && overrides.hasOwnProperty('shoutUpdated')
				? overrides.shoutUpdated!
				: aShout(),
		userUpdated:
			overrides && overrides.hasOwnProperty('userUpdated')
				? overrides.userUpdated!
				: aUser(),
	}
}

export const aToken = (overrides?: Partial<Token>): Token => {
	return {
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'iure quod aliquam eveniet praesentium dolores voluptas',
		expiresAt:
			overrides && overrides.hasOwnProperty('expiresAt')
				? overrides.expiresAt!
				: 'illo aliquid itaque iusto voluptatum in dolores',
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 9933,
		ownerId:
			overrides && overrides.hasOwnProperty('ownerId') ? overrides.ownerId! : 5016,
		usedAt:
			overrides && overrides.hasOwnProperty('usedAt')
				? overrides.usedAt!
				: 'vel deserunt sapiente voluptas aut velit ducimus',
		value:
			overrides && overrides.hasOwnProperty('value') ? overrides.value! : 'amet',
	}
}

export const aTopic = (overrides?: Partial<Topic>): Topic => {
	return {
		body:
			overrides && overrides.hasOwnProperty('body') ? overrides.body! : 'omnis',
		children:
			overrides && overrides.hasOwnProperty('children')
				? overrides.children!
				: ['eveniet'],
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'tenetur sunt ut vel quia et eos',
		createdBy:
			overrides && overrides.hasOwnProperty('createdBy')
				? overrides.createdBy!
				: 7190,
		parents:
			overrides && overrides.hasOwnProperty('parents')
				? overrides.parents!
				: ['labore'],
		pic:
			overrides && overrides.hasOwnProperty('pic') ? overrides.pic! : 'mollitia',
		slug:
			overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'quia',
		title:
			overrides && overrides.hasOwnProperty('title')
				? overrides.title!
				: 'suscipit',
	}
}

export const aUser = (overrides?: Partial<User>): User => {
	return {
		bio: overrides && overrides.hasOwnProperty('bio') ? overrides.bio! : 'itaque',
		communities:
			overrides && overrides.hasOwnProperty('communities')
				? overrides.communities!
				: [6018],
		createdAt:
			overrides && overrides.hasOwnProperty('createdAt')
				? overrides.createdAt!
				: 'asperiores esse hic amet iusto aperiam aut',
		email:
			overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'sunt',
		emailConfirmed:
			overrides && overrides.hasOwnProperty('emailConfirmed')
				? overrides.emailConfirmed!
				: true,
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 7269,
		links:
			overrides && overrides.hasOwnProperty('links')
				? overrides.links!
				: ['tenetur'],
		muted:
			overrides && overrides.hasOwnProperty('muted') ? overrides.muted! : true,
		name:
			overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'porro',
		notifications:
			overrides && overrides.hasOwnProperty('notifications')
				? overrides.notifications!
				: [9006],
		oauth:
			overrides && overrides.hasOwnProperty('oauth') ? overrides.oauth! : 'hic',
		old_id:
			overrides && overrides.hasOwnProperty('old_id')
				? overrides.old_id!
				: 'voluptatem',
		password:
			overrides && overrides.hasOwnProperty('password')
				? overrides.password!
				: 'minima',
		rating:
			overrides && overrides.hasOwnProperty('rating') ? overrides.rating! : 8261,
		ratings:
			overrides && overrides.hasOwnProperty('ratings')
				? overrides.ratings!
				: [aRating()],
		roles:
			overrides && overrides.hasOwnProperty('roles')
				? overrides.roles!
				: [aRole()],
		slug:
			overrides && overrides.hasOwnProperty('slug') ? overrides.slug! : 'omnis',
		topics:
			overrides && overrides.hasOwnProperty('topics')
				? overrides.topics!
				: ['soluta'],
		updatedAt:
			overrides && overrides.hasOwnProperty('updatedAt')
				? overrides.updatedAt!
				: 'facilis nam nemo provident et cupiditate consequatur',
		username:
			overrides && overrides.hasOwnProperty('username')
				? overrides.username!
				: 'vel',
		userpic:
			overrides && overrides.hasOwnProperty('userpic')
				? overrides.userpic!
				: 'quos',
		wasOnlineAt:
			overrides && overrides.hasOwnProperty('wasOnlineAt')
				? overrides.wasOnlineAt!
				: 'a quo aut dolor qui vero nulla',
	}
}

export const aUserNotification = (
	overrides?: Partial<UserNotification>
): UserNotification => {
	return {
		id: overrides && overrides.hasOwnProperty('id') ? overrides.id! : 782,
		kind:
			overrides && overrides.hasOwnProperty('kind') ? overrides.kind! : 'sint',
		user: overrides && overrides.hasOwnProperty('user') ? overrides.user! : 9424,
		values:
			overrides && overrides.hasOwnProperty('values')
				? overrides.values!
				: ['consequatur'],
	}
}

export const aUserResult = (overrides?: Partial<UserResult>): UserResult => {
	return {
		error:
			overrides && overrides.hasOwnProperty('error') ? overrides.error! : 'dolor',
		user:
			overrides && overrides.hasOwnProperty('user') ? overrides.user! : aUser(),
	}
}
