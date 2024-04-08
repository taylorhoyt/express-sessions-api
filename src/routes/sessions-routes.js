const express = require('express');
const {getAllSessions, deleteSession,insertSession, getSessionById, getUserSessionIds} = require("../database/sessions");
const router = express.Router();

// GET endpoint - gets one session by id
router.get('/:id', async (req, res) => {

    try {
        const session = await getSessionById(req.params.id);
        if (session) {
            res.json(session);
        }
        else {
            res.status(404).send(`Session ID: ${req.params.id} not found`);
        }
    }
    catch(err) {
        res.status(500).send(`An error occurred while fetching session ID: ${req.params.id}`);
    }
});

// GET endpoint - gets all sessionIDs sharing the same userId
router.get('/users/:userId', async (req, res) => {

    try {
        const sessionIds = await getUserSessionIds(req.params.userId);
        if (sessionIds) {
            res.json(sessionIds);
        }
        else {
            res.status(404).send(`No session IDs found for user ID: ${req.params.userId}`);
        }
    }
    catch(err) {
        res.status(500).send(`An error occurred while fetching session IDs for user ID: ${req.params.userId}`);
    }
});

// GET endpoint - gets all sessions // TODO: DEV ONLY - REMOVE
router.get('/dev/all', async (req, res) => {
    try{
        res.json(await getAllSessions());
    }
    catch(err) {
        res.status(500).send('An error occurred while fetching data!!');
        console.log(err);
    }
});

// POST endpoint - inserts a new session for a user
router.post('/:userId', async (req, res) => {

    try {
        const newSessionId = await insertSession(req.body, req.params.userId);
        if(newSessionId){
            res.json({ sessionId: newSessionId });
        }
        else {
            res.status(500).send(`Failed to insert session for user ID: ${req.params.userId}`);
        }
    }
    catch(err) {
        res.status(500).send(`An error occurred while inserting session for user ID: ${req.params.userId}`);
    }
});

// DELETE endpoint - deletes a session for a particular sessionId
router.delete('/:sessionId', async (req, res) => {
   try {
       res.json(await deleteSession(req.params.sessionId));
   }
   catch(err) {
       res.status(500).send(`An error occurred while deleting session for sessionID: ${req.params.sessionId}`);
   }
});

module.exports = router;