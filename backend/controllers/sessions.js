const mongoose = require("mongoose");

// The fixed IDs below are demo fixtures for the prototype. They are safe to
// use locally, but must never be reachable in production: that would let any
// caller mint a caretaker/doctor session.
const demoLoginEnabled = () =>
    process.env.NODE_ENV !== 'production' || process.env.DEMO_LOGIN === '1';

const withDemoLogin = (handler) => (req, res, next) => {
    if (!demoLoginEnabled()) {
        return res.status(503).json({
            error:
                'Demo login is disabled. Configure real authentication, or set DEMO_LOGIN=1 for a local prototype.',
        });
    }
    // Rotate the session id on login to avoid fixation.
    req.session.regenerate((error) => {
        if (error) return next(error);
        return handler(req, res, next);
    });
};

const logincaretaker = (req, res) => {
    req.session.oldageid = new mongoose.Types.ObjectId('6687cc90dfb46fdd2abb5006');
    req.session.name = 'Keshav old age homes';
    req.session.type = 'Caretaker';
    res.json({
        id: req.session.oldageid,
        name: req.session.name,
        type: req.session.type,
    });
};
const logindoctor = (req, res) => {
    req.session.oldageid = new mongoose.Types.ObjectId('66b60499a3cdb6e14042993c');
    req.session.name = 'Keshav';
    req.session.type = 'Doctor';
    res.json({
        id: req.session.oldageid,
        name: req.session.name,
        type: req.session.type,
    });
};
const checksession = (req, res) => {
    try {
        if (req.session.type) {
            res.json({
                oldageid: req.session.oldageid,
                name: req.session.name,
                type: req.session.type,
            });
        } else {
            res.json(null);
        }
    } catch (e) {
        res.error(e);
    }
};
const deletesession = (req, res) => {
    req.session.destroy();
    res.json(true);
};
module.exports = {
    logincaretaker: withDemoLogin(logincaretaker),
    checksession,
    deletesession,
    logindoctor: withDemoLogin(logindoctor)
};
