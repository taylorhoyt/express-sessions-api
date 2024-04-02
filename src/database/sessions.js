const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');
const Session = require('../models/session.js');

const collectionName = 'sessions';

async function insertSession(session, userId){
    const database = await getDatabase();
    const currentSession = new Session(userId, new Date().toJSON() ,session.label, session.data, session.time);
    const {insertedId} = await database.collection(collectionName).insertOne(currentSession);
    return insertedId;
}

// gets all sessions from database TODO (REMOVE - DEBUG)
async function getSessions() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
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
    insertSession,
    getSessions,
    getSessionById,
    getUserSessionIds
};