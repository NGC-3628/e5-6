import { addMember, getAll, updateMember, deleteMember } from '../controllers/members.js';
import { getDatabase } from '../data/database.js';
import { ObjectId } from 'mongodb';


jest.mock('../data/database.js');

describe('Member Controller', () => {

  // Try getAll
  describe('getAll function', () => {
    it('should return all members and a 200 status code', async () => {
      // 1. Create a new temoratu db to retrieve information from.
      const mockMembers = [
        { _id: '1', firstName: 'John', lastName: 'Doe' },
        { _id: '2', firstName: 'Jane', lastName: 'Smith' },
      ];

      // object simulated
      const res = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      
      const req = {};

      // get database mock to return a member's list
      const mockDb = {
        collection: () => ({
          find: () => ({
            toArray: jest.fn().mockResolvedValue(mockMembers),
          }),
        }),
      };
      getDatabase.mockReturnValue(mockDb);

      // 2. execute.
      await getAll(req, res);

      // 3. Verify
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(res.json).toHaveBeenCalledWith(mockMembers);
    });
  });

  describe('addMember function', () => {
    it('should add a new member and return a 201 status code', async () => {
      // simulate a db to post a member.
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
          insertOne: jest.fn().mockResolvedValue({ acknowledged: true, insertedId: 'mock-id-12345' }),
        }),
      };
      
      getDatabase.mockReturnValue(mockDb);

      // 2. adding new member through endpoints
      await addMember(req, res);

      // 3. verify.
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          insertedId: 'mock-id-12345',
        })
      );
    });
  });

  describe('updateMember function', () => {
    it('should reuturn an updated member, and a 201 status code', async () => {
      //arrage info
      const mockMemberId = new ObjectId();
      const req = {
        params: { id: mockMemberId.toHexString() },
        body: { 
          firstName: 'John Updated',
          lastName: 'Doe Updated'
         }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      const mockUpdateResult = { matchedCount: 1, modifiedCount: 1 };
      const mockDb = {
        collection: () => ({
            updateOne: jest.fn().mockResolvedValue(mockUpdateResult)
        })
      };
      getDatabase.mockReturnValue(mockDb);

      //act
      await updateMember(req, res);

      //asert 
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdateResult);
    });
  })

  //try delete
  describe('deleteMember function', () => {
  it('should delete a member and return a 200 status code', async () => {
    // 1. Arrange
    const mockMemberId = new ObjectId();
    const req = {
      params: { id: mockMemberId.toHexString() },
    };
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockDeleteResult = { acknowledged: true, deletedCount: 1 };

    // FIX: Define the mock function first
    const mockDeleteOne = jest.fn().mockResolvedValue(mockDeleteResult);
    const mockDb = {
      collection: () => ({
        deleteOne: mockDeleteOne,
      }),
    };
    getDatabase.mockReturnValue(mockDb);

    // 2. Act
    await deleteMember(req, res);

    // 3. Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDeleteResult);

    expect(mockDeleteOne).toHaveBeenCalledWith({ _id: mockMemberId });
  });

  it('should return a 404 status code if member is not found', async () => {
    // 1. Arrange
    const mockMemberId = new ObjectId();
    const req = {
      params: { id: mockMemberId.toHexString() },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockDeleteResult = { acknowledged: true, deletedCount: 0 };

    const mockDeleteOne = jest.fn().mockResolvedValue(mockDeleteResult);
    const mockDb = {
      collection: () => ({
        deleteOne: mockDeleteOne,
      }),
    };
    getDatabase.mockReturnValue(mockDb);

    // 2. Act
    await deleteMember(req, res);

    // 3. Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Member not found or could not be deleted.' });
  });
});
});

