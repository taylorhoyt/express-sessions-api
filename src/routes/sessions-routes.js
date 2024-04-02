const express = require('express');
const {insertSession, getSessionById, getUserSessionIds} = require("../database/sessions");
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
})

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

module.exports = router;