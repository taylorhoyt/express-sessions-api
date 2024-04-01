const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

const collectionName = 'sessions';

async function insertSession(session){
    const database = await getDatabase();
    const {insertedId} = await database.collection(collectionName).insertOne(session);
    return insertedId;
}

// gets all sessions from database (REMOVE - DEBUG)
async function getSessions() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

// gets a session by id
async function getSessionById(id){
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({_id: ObjectID(id)});
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