const { TABLE_NAME } = require('./common/const');
const DynamoDBService = require('./database/dynamoDBService');

const getTasks = async () => {
	const dynamoDBService = new DynamoDBService();
	const result = await dynamoDBService.scan(TABLE_NAME);
	const tasks = result.Items;
	// const tasks = [{ id: 'sdfdsf', desc: 'ssdfssss' }];

	return {
		status: 200,
		body: {
			tasks,
		},
	};
};

module.exports = {
	getTasks,
};
