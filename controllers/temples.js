import { getDatabase } from "../data/database.js";
import { ObjectId } from "mongodb";

//GET all
const getAll = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('facilities_address').find();
        result.toArray().then((facilities_address) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(facilities_address);
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
        const result = await db.collection('facilities_address').find({ _id: userId });
        result.toArray().then((facilities_address) => {
            if (facilities_address.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(facilities_address[0]);
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
const addTemples = async (req, res) => {
    const db = getDatabase();
    const facilities_address = {
        name: req.body.name,
        address: req.body.address,
        anounced: req.body.anounced,
        breakground: req.body.breakground,
        dedication: req.body.dedication,
        notes: body.notes
    };

    try{
        const result = await db.collection('facilities_address').insertOne(facilities_address);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
}



//UPDATE   update status
const updateTemple = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);
    const updatedTemple = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        grade: req.body.grade
    };

    try {
        const result = await db.collection('facilities_address').updateOne(
            { _id: userId },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//DELETE
const deleteTemple = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);

    try {
        const result = await db.collection('facilities_address').deleteOne({ _id: userId });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAll,
    getSingle,
    addTemples,
    updateTemple,
    deleteTemple
};