const mongoose = require('mongoose');
const { report, patient, oldAgeHome, doctor } = require('../Schema.js');

const getReport = async (req, res) => {
    try {
        const id = req.query.id;
        const reportInfo = await report.findOne({ _id: id });
        res.json(reportInfo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};

const count = async (req, res) => {
    try {
        const pcount = await patient.countDocuments();
        const ccount = await oldAgeHome.countDocuments();
        const dcount = await doctor.countDocuments();
        const rcount = await report.countDocuments();
        res.json({ pcount, ccount, dcount, rcount });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};

const getReports = async (req, res) => {
    try {
        const doctorID = req.session.oldageid;
        let caretakers = await doctor.findOne({_id:doctorID}).select("caretaker -_id");
        caretakers=caretakers.caretaker
        console.log(caretakers)
        const reports = await report.find({oldAgeHomeId:{ $in: caretakers }}).sort({dateOfReport:-1}).select("patient severity dateOfReport oldAgeHomeName -_id")
        res.json(reports);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};

const setPatient = async (req, res) => {
    try {
        let oid = req.session.oldageid;
        const oldAgeHomeInfo = await oldAgeHome.findOne({ _id: oid });
        const info= req.body
        info.DOB=new Date(info.DOB);
        console.log("a",info.DOB,typeof(info.DOB))
        let newpatient = new patient({
            name: info.name,
            DOB: info.DOB,
            chronics: info.chronics,
            Medications:info.Medications,
            bloodGroup: info.bloodGroup,
            gender: info.gender,
            phone: oldAgeHomeInfo.contact,
            weight: info.weight,
        });
        newpatient = await newpatient.save();
        oldAgeHomeInfo.patients.push(newpatient._id)
        oldAgeHomeInfo.save();
        res.json(newpatient._id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create patient' });
    }
};

const getPatient = async (req, res) => {
    const id = req.query.id;
    const patientInfo = await patient.findOne({ _id: id });
    res.json(patientInfo);
};

const getPatientCard = async (req, res) => {
    const id = req.query.id;
    const patientInfo = await patient.findOne({ _id: id }).select("name DOB gender bloodGroup verifiedreports unverifiedreports",);
    res.json(patientInfo);
};

const getPatients = async (req, res) => {
    try {
        const patients = await oldAgeHome.findOne({_id:req.session.oldageid}).select('patients');
        res.json(patients.patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve patients' });
    }
};

const getOldageHomeInfo = async (req, res) => {
    try {
        const id = req.query.id;
        const oldAgeHomeDetails = await oldAgeHome.findOne({_id:id}).select({"key":1,"doctors":1,"name":1});
        res.json(oldAgeHomeDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve old age home details',
        });
    }
};
const getDoctorInfo = async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id)
        const DoctorDetails = await doctor.findOne({_id:id});
        res.json(DoctorDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve old age home details',
        });
    }
};

const addkey = async (req,res)=>{
    try{
        const {key} = req.body;
        console.log(key)
        const a = req.session.oldageid
        let doc= await doctor.findOne({_id:a});
        const x = doc.caretaker;
        console.log(x)
        const id = await oldAgeHome.findOne({key:key});
        console.log(id)
        x.push(id._id.toString())
        doc.caretaker=x;
        doc.save();
        res.json("success");
    }
    catch(error){
        res.status(500).json({
            error: 'Failed to add key',
        });
    }
}
module.exports = {
    getReport,
    getPatient,
    getPatientCard,
    getReports,
    setPatient,
    getPatients,
    getOldageHomeInfo,
    getDoctorInfo,
    count,
    addkey
};
