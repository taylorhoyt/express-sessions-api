const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');
const Session = require('../models/session.js');

const collectionName = 'sessions';

// gets all sessions from the database // TODO: DEV ONLY - REMOVE
async function getAllSessions(){
    const database = await getDatabase();
    const allSessions = await database.collection(collectionName).find().toArray();
    return allSessions.map(session => session._id.toString());
}

// deletes a session from the database
async function deleteSession(sessionId) {
    const database = await getDatabase();
    return await database.collection(collectionName).deleteOne({_id: new ObjectId(sessionId)});
}

// inserts a session
async function insertSession(session, userId){
    const database = await getDatabase();
    const currentSession = new Session(userId, new Date().toJSON() ,session.label, session.data, session.time);
    const {insertedId} = await database.collection(collectionName).insertOne(currentSession);
    return insertedId;
}

// gets a session by id
async function getSessionById(sessionId){
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({_id: new ObjectId(sessionId)});
}

// gets a list of all sessions owned by the user
async function getUserSessionIds(userId){
    const database = await getDatabase();
    const userSessions = await database.collection(collectionName).find({userId: userId}).toArray();
    return userSessions.map(session => session._id.toString());
}

module.exports = {
    getAllSessions,
    deleteSession,
    insertSession,
    getSessionById,
    getUserSessionIds
};