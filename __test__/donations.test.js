import { getAllDonations, getSingle } from "../controllers/donations.js";
import { getDatabase } from "../data/database.js";
import { ObjectId } from "mongodb";

jest.mock('../data/database.js');

describe('Temples controller', () => {

//Try GETALL
describe('get all function', () => {
    it('should return all temples and a 200 status code', async () => {
        //1 create a temporary temple info
        const mockDonations = [
            {_id:'1', member: 'Luca Modrich', donationType: 'tithing'},
            {_id:'2', member: 'Roberta Irrarragori', donationType: 'fast offering'},

        ];

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
            toArray: jest.fn().mockResolvedValue(mockDonations),
          }),
        }),
      };
      getDatabase.mockReturnValue(mockDb);

      // 2. execute.
      await getAllDonations(req, res);

      // 3. Verify
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(res.json).toHaveBeenCalledWith(mockDonations);
    });
  });
});


