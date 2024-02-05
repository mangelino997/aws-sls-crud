// updateTask.js
const DynamoDBService = require('./dynamoDBService');
const { TABLE_NAME } = require('common/const');

const middy = require('@middy/core');
const validator = require('@middy/validator');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJSONBodyParser = require('@middy/http-json-body-parser');

const updateTask = async event => {
	const dynamoDBService = new DynamoDBService();
	const { id } = event.pathParameters;
	const { done } = event.body;

	try {
		// Actualizar la tarea en DynamoDB
		await dynamoDBService.update(id, { done }, TABLE_NAME);

		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Task updated',
			}),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Failed to update task',
				error: error.message,
			}),
		};
	}
};

const inputValidationSchema = {
	type: 'object',
	required: ['body'],
	properties: {
		body: {
			type: 'object',
			required: ['title', 'description', 'done'],
			properties: {
				title: { type: 'string', minLength: 1 },
				description: { type: 'string', minLength: 1 },
				done: { type: 'boolean' },
			},
		},
	},
};

module.exports = {
	updateTask: middy(updateTask)
		.use(httpJSONBodyParser())
		.use(validator({ inputSchema: inputValidationSchema }))
		.use(httpErrorHandler()),
};
