const { getTasks } = require('../getTasks');

// mock para dynamoDBService
// jest.mock('../database/dynamoDBService', () => ({
// 	scan: jest.fn().mockReturnValue({
// 		Items: [{ id: '1234', name: 'example' }],
// 	}),
// }));

describe('getTasks function', () => {
	it('should return tasks successfully', async () => {
		const tasks = await getTasks();
		expect(tasks.status).toBe(200);
		expect(tasks.body.tasks).toHaveLength(1);
	});
});
