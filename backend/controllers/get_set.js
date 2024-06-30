const mongoose = require('mongoose');
const { report, patient, oldAgeHome, doctor} = require("../Schema.js");



const getReport = async (req, res) => {
    try {
        const id = req.params.id;
        const reportInfo = await report.findOne({ _id: id });
        res.json(reportInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
}

const count= async (req, res) => {
    try {
        const pcount = await patient.countDocuments();
        const ccount = await oldAgeHome.countDocuments();
        const dcount = await doctor.countDocuments();
        const rcount = await report.countDocuments();
        res.json({ pcount, ccount, dcount, rcount });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
}

const getReports= async (req, res) => {
    try {
        const reports = await report.find();
        res.json(reports);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
}

const setPatient = async (req,res)=>{
    const info = req.body.info;
    let newpatient = new patient({
        name:info.name,
        DOB:info.date,
        chronics:info.chronics,
        bloodGroup:info.bloodGroup,
        gender:info.gender,
        phone:info.phone,
        weight:info.weight,
    })
    newpatient = await newpatient.save();
    res.json(newpatient._id);
}

const getPatient = async (req,res) => {
    const id = req.params.id;
    const patientInfo =await patient.findOne({_id:id});
    res.json(patientInfo);
}

const getPatients = async (req,res) => {
    try{
        const patients = await oldAgeHome.findOne().select('patients'); // TODO: add session oldagehome query
        res.json(patients);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve patients'});
    }
}

const getOldageHomeInfo = async (req,res) => {
    try{
        const name = req.params.name;
        const oldAgeHomeDetails = await oldAgeHome.findOne(); // TODO: add session oldagehome query
        res.json(oldAgeHomeDetails);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: 'Failed to retrieve old age home details'});
    }
}

module.exports = { getReport, getPatient, getReports, setPatient, getPatients, getOldageHomeInfo, count }