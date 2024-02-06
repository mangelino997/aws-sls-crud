// const DynamoDBService = require('./dynamoDBService');
// const { TABLE_NAME } = require('common/const');
const { v4 } = require('uuid');
const middy = require('@middy/core');
const validator = require('@middy/validator');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJSONBodyParser = require('@middy/http-json-body-parser');

const addTask = async event => {
	// const dynamoDBService = new DynamoDBService();

	try {
		const { title, description } = event.body;
		const createdAt = new Date().toISOString();
		const id = v4();

		const newTask = {
			id,
			title,
			description,
			createdAt,
		};

		// await dynamoDBService.put(newTask, TABLE_NAME);
		console.log(newTask);
		return {
			status: 200,
			message: 'Task successfully added to DynamoDB.',
		};
	} catch (error) {
		return {
			status: 500,
			message: 'Failed to add task to DynamoDB.',
			error: error.message,
		};
	}
};

const inputValidationSchema = {
	type: 'object',
	required: ['body'],
	properties: {
		body: {
			type: 'object',
			required: ['title', 'description'],
			properties: {
				title: { type: 'string', minLength: 1 },
				description: { type: 'string', minLength: 1 },
				done: { type: 'boolean' },
			},
		},
	},
};

module.exports = {
	addTask: middy(addTask)
		.use(httpJSONBodyParser())
		.use(validator({ inputSchema: inputValidationSchema }))
		.use(httpErrorHandler()),
};
