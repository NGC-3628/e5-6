import { getDatabase } from "../data/database.js";
import { ObjectId } from "mongodb";


//GET all
const getAllDonations = async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.collection('donations').find();
        result.toArray().then((donations) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(donations);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Internal server error' });
    }
};

//GET by ID
const getSingleDonation = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const db = getDatabase();
        const result = await db.collection('donations').find({ _id: userId });
        result.toArray().then((donations) => {
            if (donations.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(donations[0]);
            } else {
                res.status(404).json({ message: 'Donation cannot be found' });
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
const addDonation = async (req, res) => {
    const db = getDatabase();
    const donations = {
        member: req.body.member,
        donationType: req.body.donationType,
        amount: req.body.amount
    };

    try{
        const result = await db.collection('donations').insertOne(donations);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    };
}



//UPDATE   update status
const updateDonation = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);
    const updatedTemple = {
        member: req.body.member,
        donationType: req.body.donationType,
        amount: req.body.amount
    };

    try {
        const result = await db.collection('donations').updateOne(
            { _id: userId },
            { $set: req.body }
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//DELETE
const deleteDonation = async (req, res) => {
    const db = getDatabase();
    const userId = new ObjectId(req.params.id);

    try {
        const result = await db.collection('donations').deleteOne({ _id: userId });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllDonations,
    getSingleDonation,
    addDonation,
    updateDonation,
    deleteDonation
};