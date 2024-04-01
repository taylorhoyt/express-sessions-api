const express = require('express');
const {insertSession, getSessions, getSessionById, getUserSessionIds} = require("../database/sessions");
const router = express.Router();

// GET endpoint - gets all sessions in db (REMOVE - DEBUG)
router.get('/', async (req, res) => {
    res.send(await getSessions());
});

// GET endpoint - gets one session by id
router.get('/:id', async (req, res) => {
    res.send(await getSessionById(req.params.id));
});

// GET endpoint - gets all sessionIDs sharing the same userId
router.get('/users/:userId', async (req, res) => {
    res.send(await getUserSessionIds(req.params.userId));
})

// POST endpoint - inserts a new session
router.post('/', async (req, res) => {
    const newSession = req.body;
    await insertSession(newSession);
    res.send({message: 'new session inserted'});
});

module.exports = router;