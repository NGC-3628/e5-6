import { getDatabase } from "../data/database.js";
import { ObjectId } from "mongodb";

//GET all
const getAll = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('directory_members').find();
        result.toArray().then((directory_members) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(directory_members);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
};

//GET by ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const db = getDatabase();
        const result = await db.collection('directory_members').find({ _id: userId });
        result.toArray().then((directory_members) => {
            if (directory_members.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(directory_members[0]);
            } else {
                res.status(404).json({ message: 'Student cannot be found' });
            }
        });
    } catch (err) {
        if (err.name === 'BSONError' && err.message.includes('inputBuffer')) { 
             res.status(400).json({ message: 'Id number invalid\nBad request'})
        } else {
             res.status(500).json({ message: err.message || 'Internal server error' });
        }
    }
};


//POST
const addMember = async (req, res) => {
    const db = getDatabase();
    const members = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        ward: req.body.ward,
        ministeringPartner: req.body.ministeringPartner,
        servedMission: req.body.servedMission
    };

    try{
        const result = await db.collection('directory_members').insertOne(members);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
}



//UPDATE   update status
const updateMember = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);
    const updatedTemple = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        ward: req.body.ward,
        ministeringPartner: req.body.ministeringPartner,
        servedMission: req.body.servedMission
    };

    try {
        const result = await db.collection('directory_members').updateOne(
            { _id: userId },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//DELETE
const deleteMember = async (req, res) => {
const memberId = new ObjectId(req.params.id);
  try {
    const db = getDatabase();
    const result = await db.collection('members').deleteOne({ _id: memberId });
    
    if (result.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result); // Use 200 for success with a body
    } else {
      // If no document was found with that ID, send 404
      res.status(404).json({ message: 'Member not found or could not be deleted.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the member.', error: error.message });
  }
};

export {
    getAll,
    getSingle,
    addMember,
    updateMember,
    deleteMember
};