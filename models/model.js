import mongoose from "mongoose";
const templeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    anounced:{
        type: Date,
        required: true
    },
    breakground:{
        type: Date,
        required: true
    },
    dedication:{
        type: Date,
        required: true
    },
    notes:{
        type: String
    }
});

const memberSchema = mongoose.Schema({
    membership:{
        type: Serial,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    MinisteringPartner:{
        type: String
    },
    servedMission: {
        type: String
    }
});

export{memberSchema, templeSchema};