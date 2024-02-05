// getTask.js
const DynamoDBService = require('./dynamoDBService');
const { TABLE_NAME } = require('common/const');

const getTask = async event => {
	const dynamoDBService = new DynamoDBService();
	const { id } = event.pathParameters;
	const result = await dynamoDBService.get(id, TABLE_NAME);
	const task = result.Item;

	return {
		status: 200,
		body: task,
	};
};

module.exports = {
	getTask,
};
