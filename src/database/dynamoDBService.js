const AWS = require('aws-sdk');

class DynamoDBService {
	constructor() {
		this.dynamodb = new AWS.DynamoDB.DocumentClient();
	}

	async scan(tableName) {
		return await this.dynamodb.scan({ TableName: tableName }).promise();
	}

	async get(id, tableName) {
		return await this.dynamodb
			.get({
				TableName: tableName,
				Key: { id },
			})
			.promise();
	}

	async put(item, tableName) {
		return await this.dynamodb
			.put({
				TableName: tableName,
				Item: item,
			})
			.promise();
	}

	async update(id, updates, tableName) {
		const params = {
			TableName: tableName,
			Key: { id },
			UpdateExpression: 'set',
			ExpressionAttributeValues: {},
			ReturnValues: 'ALL_NEW',
		};

		// Construir la expresión de actualización dinámicamente
		Object.keys(updates).forEach(key => {
			params.UpdateExpression += ` ${key} = :${key},`;
			params.ExpressionAttributeValues[`:${key}`] = updates[key];
		});

		params.UpdateExpression = params.UpdateExpression.slice(0, -1); // Eliminar la coma extra al final

		return await this.dynamodb.update(params).promise();
	}
}

module.exports = DynamoDBService;
