const express = require('express');
const {insertSession, getSessions, getSessionById, getUserSessionIds} = require("../database/sessions");
const router = express.Router();

// GET endpoint - gets all sessions in db (REMOVE - DEBUG)
router.get('/', async (req, res) => {
    res.send(await getSessions());
});

// GET endpoint - gets one session by id
router.get('/:id', async (req, res) => {

    try {
        const session = await getSessionById(req.params.id);
        if (session) {
            res.json(session);
        } else {
            res.status(404).send('Session not found');
        }
    }
    catch(err) {
        console.log(err);
    }
});

// GET endpoint - gets all sessionIDs sharing the same userId
router.get('/users/:userId', async (req, res) => {
    res.send(await getUserSessionIds(req.params.userId));
})

// POST endpoint - inserts a new session
router.post('/', async (req, res) => {
    const newSession = req.body;
    // TODO: Fix the userId thing
    //let userId = req.user.sub;

    res.send(await insertSession(newSession, "101"));
});

module.exports = router;