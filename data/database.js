import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
let database;

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized');
        return callback(null, database);
    }

    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('MongoDB connected successfully using Mongoose.');
            database = mongoose.connection.db;
            callback(null, database);
        })
        .catch((err) => {
            console.error('Mongoose connection error: ', err);
            callback(err);
        });
};

const getDatabase = () => {
    if(!database) {
        throw Error('Database not initialized');
    }
    return database;
};

export { initDb, getDatabase };