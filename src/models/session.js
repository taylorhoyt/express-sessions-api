/**
 * Class representing a data collection session.
 * @class
 */
class Session {
    constructor(userId, timeStamp, label, data, time) {
        this.userId = userId;
        this.timeStamp = timeStamp;
        this.label = label;
        this.data = data;
        this.time = time;
    }
}

module.exports = Session;