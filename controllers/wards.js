import { getDatabase } from "../data/database.js";
import { ObjectId } from "mongodb";

//GET all
const getAll = async (req, res) => {
    try{
        const db = getDatabase();
        const result = await db.collection('ward').find();
        result.toArray().then((ward) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(ward);
        });
    } catch(err) {
            res.status(500).json({ message: err.message || 'Internet server error' });
        }
};


//GET by ID
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const db = getDatabase();
        const result = await db.collection('ward').find({ _id: userId });
        result.toArray().then((ward) => {
            if (ward.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(ward[0]);
            } else {
                res.status(404).json({ message: 'Ward cannot be found' });
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
const addWard = async (req, res) => {
    const db = getDatabase();
    const wards = {
        bishop: req.body.bishop,
        membership: req.body.membership,
        address: req.body.address
    };

    try{
        const result = await db.collection('ward').insertOne(wards);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
}



//UPDATE   update status
const updateWard = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);
    const updatedTemple = {
        bishop: req.body.bishop,
        membership: req.body.membership,
        address: req.body.address
    };

    try {
        const result = await db.collection('ward').updateOne(
            { _id: userId },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//DELETE
const deleteWard = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);

    try {
        const result = await db.collection('ward').deleteOne({ _id: userId });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAll,
    getSingle,
    addWard,
    updateWard,
    deleteWard
};