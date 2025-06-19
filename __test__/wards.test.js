import { addWard, getAll } from "../controllers/wards";
import { getDatabase } from "../data/database";
import { ObjectId } from "mongodb";

jest.mock('../data/database');

describe('Ward controller', () => {
    //try grtAll
    describe('getAll function', () => {
        it('should return all wards and 200 status code', async() => {
            const mockWards = [
                {_id: '1', bishop: 'John Doe', address: '1256 Elam Dr'},
                {_id: '2', bishop: 'Joe Doe', address: '7893 Liam St'},
            ];
            //object simulated
            const res = {
                setHeader: jest.fn(),
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const req = {};

            //get databse mock to return a ward's list
            const mockDb = {
                collection: () => ({
                    find: () => ({
                        toArray: jest.fn().mockResolvedValue(mockWards),
                    }),
                }),
            };
            getDatabase.mockReturnValue(mockDb);

            //2. execute
            await getAll(req, res);

            //3. verify
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
            expect(res.json).toHaveBeenCalledWith(mockWards);
        });
    });
});