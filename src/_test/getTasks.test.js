const { getTasks } = require('../getTasks');
const DynamoDBService = require('../database/dynamoDBService');

// Mock para DynamoDBService
jest.mock('../database/dynamoDBService', () => {
	return jest.fn().mockImplementation(() => ({
		scan: jest.fn().mockResolvedValue({ Items: [{ id: '1', name: 'Task 1' }] }),
	}));
});

describe('getTasks function', () => {
	it('should return tasks successfully', async () => {
		const response = await getTasks();

		expect(DynamoDBService).toHaveBeenCalledTimes(1);
		expect(response.status).toBe(200);
		expect(response.body.tasks).toHaveLength(1);
		expect(response.body.tasks[0]).toHaveProperty('id', '1');
		expect(response.body.tasks[0]).toHaveProperty('name', 'Task 1');
	});
});
