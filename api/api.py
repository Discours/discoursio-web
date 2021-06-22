from ariadne import QueryType
from ariadne import MutationType
from ariadne import SubscriptionType
from ariadne import ScalarType
from ariadne import make_executable_schema, load_schema_from_path
from ariadne.asgi import GraphQL
from datetime import datetime
from peewee import *
import asyncio

type_defs = load_schema_from_path("schema.graphql")
db = SqliteDatabase('discours.db')

mutation = MutationType()
subscription = SubscriptionType()
query = QueryType()
datetime_scalar = ScalarType("DateTime")

# models 

class User(Model):
	username = CharField()
	email = CharField()
	createdAt = DateTimeField(default=datetime.now)
	muted = BooleanField()
	rating = IntField()
	# roles = 
	updatedAt = DateTimeField(default=datetime.now)
	username = CharField()
	userpic = CharField()
	userpicId = CharField()
	wasOnlineAt = DateTimeField(default=datetime.now)

	class Meta:
		database = db


class Message(Model):
	author = ForeignKeyField(User, backref='messages')
	body = TextField()
	createdAt = DateTimeField(default=datetime.now)
	replyTo = ForeignKeyField('self', null=True)
	updatedAt = DateTimeField(default=datetime.now)

	class Meta:
		database = db

# init storage
db.connect()
db.create_tables([User, Message])
only_user = User.get(User.username == "admin")
all_messages = {}
for message in Message.select():
	all_messages[message.id] = message

new_message_queue = asyncio.Queue()
updated_message_queue = asyncio.Queue()
deleted_message_queue = asyncio.Queue()

@datetime_scalar.serializer
def serialize_datetime(value):
	return value.isoformat()

@query.field("getMessages")
def resolve_get_messages(_, info, count, page):
	return all_messages.values()

@mutation.field("createMessage")
def resolve_create_message(_, info, input):
	try:
		new_message = Message.create(
			author = only_user,
			body = input["body"],
			replyTo = input.get("replyTo")
		)
	except Exception as err:
		return {
			"status" : false,
			"message" : err
		}
	
	all_messages[new_message.id] = new_message
	
	new_message_queue.put_nowait(new_message)
	
	return {
		"status" : True,
		"message" : new_message
	}

@mutation.field("updateMessage")
def resolve_update_message(_, info, input):
	message_id = input["id"]
	body = input["body"]
	
	if not message_id in all_messages:
		return {
			"status" : False,
			"error" : "invalid message id"
		}
	
	updated_message = all_messages[message_id]
	
	updated_message.body = body
	#updated_message.updatedAt = datetime.now
	try:
		updated_message.save()
	except Exception as err:
		return {
			"status" : false,
			"message" : err
		}
	
	updated_message_queue.put_nowait(updated_message)
	
	return {
		"status" : True,
		"message" : updated_message
	}

@mutation.field("deleteMessage")
def resolve_delete_message(_, info, messageId):
	if not messageId in all_messages:
		return {
			"status" : False,
			"error" : "invalid message id"
		}
	message = all_messages[messageId]
	
	try:
		message.delete_instance()
	except Exception as err:
		return {
			"status" : false,
			"message" : err
		}
		
	del all_messages[messageId]
	
	deleted_message_queue.put_nowait(message)
	
	return {
		"status" : True
	}


@subscription.source("messageCreated")
async def new_message_generator(obj, info):
	while True:
		new_message = await new_message_queue.get()
		yield new_message

@subscription.source("messageUpdated")
async def updated_message_generator(obj, info):
	while True:
		message = await updated_message_queue.get()
		yield message

@subscription.source("messageDeleted")
async def deleted_message_generator(obj, info):
	while True:
		message = await deleted_message_queue.get()
		yield new_message

@subscription.field("messageCreated")
@subscription.field("messageUpdated")
@subscription.field("messageDeleted")
def message_resolver(message, info):
	return message

schema = make_executable_schema(type_defs, query, mutation, subscription, datetime_scalar)
server = GraphQL(schema, debug=True)
db.close()
