import { addMember } from '../controllers/members.js';
import { getDatabase } from '../data/database.js';

// Mock the database dependency to isolate the test
jest.mock('../data/database.js');

describe('Member Controller', () => {
  describe('addMember', () => {
    it('should add a new member and return a 201 status code', async () => {
      // 1. Set up the test
      const req = {
        body: {
          firstName: 'John',
          lastName: 'Doe',
          birthday: '1990-01-01',
          ward: 'Test Ward',
          ministeringPartner: 'Jane Smith',
          servedMission: 'Yes',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockDb = {
        collection: () => ({
          insertOne: jest.fn().mockResolvedValue({ insertedId: 'some-new-id' }),
        }),
      };
      getDatabase.mockReturnValue(mockDb);

      // 2. Run the function being tested
      await addMember(req, res);

      // 3. Assert (check) that it behaved as expected
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          insertedId: 'some-new-id',
        })
      );
    });
  });
});