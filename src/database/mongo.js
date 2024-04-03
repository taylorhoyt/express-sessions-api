const {MongoClient} = require('mongodb');

let database = null;

async function startDatabase() {
	const mongoDBURL = process.env.MONGODB_URL;
	const connection = await MongoClient.connect(mongoDBURL, { serverSelectionTimeoutMS: 50000 });
	database = connection.db();
}

async function getDatabase() {
	if (!database) await startDatabase();
	return database;
}

module.exports = {
	getDatabase,
	startDatabase,
};
