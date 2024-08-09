const logincaretaker = (req, res) => {
    req.session.oldageid = '6687cc90dfb46fdd2abb5006';
    req.session.name = 'Keshav old age homes';
    req.session.type = 'Caretaker';
    res.json({
        id: req.session.oldageid,
        name: req.session.name,
        type: req.session.type,
    });
};
const logindoctor = (req, res) => {
    req.session.oldageid = '66b60499a3cdb6e14042993c';
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
    logincaretaker,
    checksession,
    deletesession,
    logindoctor
};
