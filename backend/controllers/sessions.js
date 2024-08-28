const mongoose = require("mongoose");
const {oldAgeHome, doctor} = require("../Schema.js")
const crypto = require('crypto');
function generateUniqueKey() {
    return crypto.randomBytes(8).toString('hex');
}
const logincaretaker = async(req, res) => {
    const {id,name} = req.body;
    const oah = await oldAgeHome.findOne({uid:id})
    if(oah){
        req.session.oldageid = oah._id;
        req.session.name = oah.name;
    }
    else{
        const oah1 = new oldAgeHome({
            name:name,
            uid:id,
            doctors: [],
            patients: [],
            key: generateUniqueKey()
        })
        oah1.save();
        req.session.oldageid=oah1._id;
        req.session.name=oah1.name
    }
    req.session.type = 'Caretaker';
    res.json({
        id: req.session.oldageid,
        name: req.session.name,
        type: req.session.type,
    });
};
const logindoctor = async(req, res) => {
    const {id,name} = req.body;
    const d = await doctor.findOne({uid:id})
    if(d){
        req.session.oldageid = d._id;
        req.session.name = d.name;
    }
    else{
        const d1 = new doctor({
            name:name,
            uid:id,
            caretaker: [],
        })
        d1.save();
        req.session.oldageid=d._id;
        req.session.name=d.name
    }
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
