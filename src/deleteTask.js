import { TABLE_NAME } from 'common/const';
const AWS = require('aws-sdk');

const deleteTask = async event => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const { id } = event.pathParameters;

	await dynamodb
		.delete({
			TableName: TABLE_NAME,
			Key: {
				id,
			},
		})
		.promise();

	return {
		status: 200,
		body: {
			message: 'Deleted Task',
		},
	};
};

module.exports = {
	deleteTask,
};
