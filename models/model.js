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
        type: Number,
        required: true
    },
    breakground:{
        type: Number,
        required: true
    },
    dedication:{
        type: Number,
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
    birthday: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    ministeringPartner:{
        type: String
    },
    servedMission: {
        type: String
    }
});

const wardSchema = mongoose.Schema({
    bishop: {
        type: String,
        required: true
    },
    membership: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        requiered: true
    }
});

const donationSchema = mongoose.Schema({
    member: {
        type: String,
        requiered: true
    },
    donationType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

export{memberSchema, templeSchema, wardSchema, donationSchema};