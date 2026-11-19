const mongoose = require('mongoose');
const { report, patient, oldAgeHome, doctor } = require('../Schema.js');
const {
    accessibleHomeIds,
    accessibleHomeObjectIds,
    isAccessibleHome,
    findAccessiblePatient,
    findAccessibleReport,
} = require('./access');

const uniqueIds = (values) => [...new Set(values.map(String))];

const getReport = async (req, res) => {
    try {
        const reportInfo = await findAccessibleReport(req.session, req.query.id);
        if (!reportInfo) {
            return res.status(404).json({ error: 'Report not found' });
        }
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
        const homeIds = await accessibleHomeObjectIds(req.session);
        const reports = await report
            .find({ oldAgeHomeId: { $in: homeIds }, doctorNotes: '' })
            .sort({ dateOfReport: -1 })
            .select('patient severity dateOfReport oldAgeHomeName patientId');
        res.json(reports);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to retrieve reports' });
    }
};

const setPatient = async (req, res) => {
    try {
        if (req.session.type !== 'Caretaker') {
            return res.status(403).json({ error: 'Caretaker session required' });
        }
        const oldAgeHomeInfo = await oldAgeHome.findOne({ _id: req.session.oldageid });
        if (!oldAgeHomeInfo) {
            return res.status(404).json({ error: 'Old age home not found' });
        }

        const info = req.body;
        info.DOB = new Date(info.DOB);
        let newpatient = new patient({
            name: info.name,
            DOB: info.DOB,
            chronics: info.chronics,
            Medications: info.Medications,
            bloodGroup: info.bloodGroup,
            gender: info.gender,
            phone: oldAgeHomeInfo.contact,
            weight: info.weight,
        });
        newpatient = await newpatient.save();
        oldAgeHomeInfo.patients.push(newpatient._id);
        await oldAgeHomeInfo.save();
        res.json(newpatient._id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create patient' });
    }
};

const getPatient = async (req, res) => {
    try {
        const access = await findAccessiblePatient(req.session, req.query.id);
        if (!access) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(access.patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve patient' });
    }
};

const getPatientCard = async (req, res) => {
    try {
        const access = await findAccessiblePatient(req.session, req.query.id);
        if (!access) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        const patientInfo = await patient
            .findOne({ _id: access.patient._id })
            .select('name DOB gender bloodGroup verifiedreports unverifiedreports');
        res.json(patientInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve patient' });
    }
};

const getPatients = async (req, res) => {
    try {
        const homeIds = await accessibleHomeObjectIds(req.session);
        const homes = await oldAgeHome
            .find({ _id: { $in: homeIds } })
            .select('patients -_id');
        const patientIds = uniqueIds(homes.flatMap((home) => home.patients || []));
        res.json(patientIds.map((id) => new mongoose.Types.ObjectId(id)));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve patients' });
    }
};

const getOldageHomeInfo = async (req, res) => {
    try {
        const fallback = req.session.type === 'Caretaker' ? req.session.oldageid : null;
        const id = req.query.id || fallback;
        const homeIds = await accessibleHomeIds(req.session);

        if (!isAccessibleHome(homeIds, id)) {
            return res.status(404).json({ error: 'Old age home not found' });
        }

        const oldAgeHomeDetails = await oldAgeHome
            .findOne({ _id: id })
            .select({ key: 1, doctors: 1, name: 1 });
        if (!oldAgeHomeDetails) {
            return res.status(404).json({ error: 'Old age home not found' });
        }
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        let DoctorDetails;
        if (req.session.type === 'Doctor') {
            if (String(id) !== String(req.session.oldageid)) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            DoctorDetails = await doctor.findOne({ _id: id });
        } else {
            DoctorDetails = await doctor.findOne({
                _id: id,
                'caretaker.id': req.session.oldageid,
            });
        }

        if (!DoctorDetails) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(DoctorDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve old age home details',
        });
    }
};

const addkey = async (req, res) => {
    try {
        if (req.session.type !== 'Doctor') {
            return res.status(403).json({ error: 'Doctor session required' });
        }
        const { key } = req.body;
        if (!key) {
            return res.status(400).json({ error: 'Missing key' });
        }

        let doc = await doctor.findOne({ _id: req.session.oldageid });
        if (!doc) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        let home = await oldAgeHome.findOne({ key: key });
        if (!home) {
            return res.json('fail');
        }

        const alreadyLinked = (doc.caretaker || []).some(
            (entry) => String(entry.id) === String(home._id)
        );
        if (!alreadyLinked) {
            home.doctors = home.doctors || [];
            home.doctors.push({ name: req.session.name, id: req.session.oldageid });
            await home.save();

            doc.caretaker = doc.caretaker || [];
            doc.caretaker.push({ id: home._id, name: home.name });
            await doc.save();
        }
        res.json('success');
    } catch (error) {
        res.status(500).json({
            error: 'Failed to add key',
        });
    }
};

const deletekey = async (req, res) => {
    try {
        let { id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        if (req.session.type === 'Caretaker') {
            let oah = await oldAgeHome.findOne({ _id: req.session.oldageid });
            if (!oah) {
                return res.status(404).json({ error: 'Old age home not found' });
            }
            oah.doctors = (oah.doctors || []).filter(
                (entry) => String(entry.id) !== String(id)
            );
            await oah.save();

            let doc = await doctor.findOne({ _id: id });
            if (doc) {
                doc.caretaker = (doc.caretaker || []).filter(
                    (entry) => String(entry.id) !== String(req.session.oldageid)
                );
                await doc.save();
            }
        } else if (req.session.type === 'Doctor') {
            const doc = await doctor.findOne({ _id: req.session.oldageid });
            if (!doc) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
            const linked = (doc.caretaker || []).some(
                (entry) => String(entry.id) === String(id)
            );
            if (!linked) {
                return res.status(404).json({ error: 'Old age home not found' });
            }

            let oah = await oldAgeHome.findOne({ _id: id });
            if (oah) {
                oah.doctors = (oah.doctors || []).filter(
                    (entry) => String(entry.id) !== String(req.session.oldageid)
                );
                await oah.save();
            }

            doc.caretaker = (doc.caretaker || []).filter(
                (entry) => String(entry.id) !== String(id)
            );
            await doc.save();
        } else {
            return res.status(403).json({ error: 'Unsupported session type' });
        }

        res.json('done');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to remove key' });
    }
};

const reviewreport = async (req, res) => {
    try {
        if (req.session.type !== 'Doctor') {
            return res.status(403).json({ error: 'Doctor session required' });
        }

        const { id, note } = req.body;
        const rep = await findAccessibleReport(req.session, id);
        if (!rep) {
            return res.status(404).json({ error: 'Report not found' });
        }

        rep.doctorNotes = note;
        await rep.save();

        const patientInfo = await patient.findOne({ _id: rep.patientId });
        if (patientInfo) {
            const isUnverified = (patientInfo.unverifiedreports || []).some(
                (reportId) => String(reportId) === String(rep._id)
            );
            if (isUnverified) {
                patientInfo.unverifiedreports = patientInfo.unverifiedreports.filter(
                    (reportId) => String(reportId) !== String(rep._id)
                );
            }
            const isVerified = (patientInfo.verifiedreports || []).some(
                (reportId) => String(reportId) === String(rep._id)
            );
            if (!isVerified) {
                patientInfo.verifiedreports = patientInfo.verifiedreports || [];
                patientInfo.verifiedreports.push(rep._id);
            }
            await patientInfo.save();
        }

        res.json('reviewed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to review report' });
    }
};

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
    addkey,
    deletekey,
    reviewreport
};
