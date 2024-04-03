require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertSession} = require('./database/sessions');
const sessionsRoutes = require('./routes/sessions-routes')

// define express app
const app = express();

// helmet enhances api security
app.use(helmet());

// body parser for parsing JSON bodies
app.use(bodyParser.json());

// enable CORS for all requests
app.use(cors());

// morgan for logging http requests
app.use(morgan('combined'));

const checkJwt = require('./services/auth-service.js');
// check authentication before accessing endpoints
app.use(checkJwt);

app.use('/sessions', sessionsRoutes);

startDatabase().then(async () => {

	/*await insertSession({
		label: 'Session One',
		data:[31,45,38,46,34,32,30,43,41,50,37,42,39,35,47,40],
		time:[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80]
	}, "101");

	await insertSession({
		label: 'Session Two',
		data:[31,45,38,46,34,32,30,43,41,50,37,42,39,35,47,40],
		time:[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80]
	}, "121");*/

	app.listen(3001, () => {
		console.log('listening on port 3001');
	});
});
