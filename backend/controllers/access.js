const mongoose = require('mongoose');
const { doctor, oldAgeHome, patient, report } = require('../Schema.js');

// A caller may only touch records that belong to the old-age home(s) their
// session is scoped to. Caretakers are scoped to their own home; doctors are
// scoped to the homes that granted them a key.
async function accessibleHomeIds(session) {
    if (!session || !session.type || !session.oldageid) return [];
    if (session.type === 'Caretaker') return [String(session.oldageid)];
    if (session.type !== 'Doctor') return [];

    const doc = await doctor.findById(session.oldageid).select('caretaker -_id').lean();
    return (doc && doc.caretaker ? doc.caretaker : [])
        .map((entry) => entry && entry.id)
        .filter(Boolean)
        .map(String);
}

async function accessibleHomeObjectIds(session) {
    return accessibleHomeIds(session).map((id) => new mongoose.Types.ObjectId(id));
}

function isAccessibleHome(ids, homeId) {
    return Boolean(homeId) && ids.includes(String(homeId));
}

// Returns the patient plus the accessible home that owns it, or null.
async function findAccessiblePatient(session, patientId) {
    if (!mongoose.Types.ObjectId.isValid(patientId)) return null;
    const pid = new mongoose.Types.ObjectId(patientId);
    const homeIds = await accessibleHomeIds(session);
    if (homeIds.length === 0) return null;

    const home = await oldAgeHome
        .findOne({ _id: { $in: homeIds }, patients: pid })
        .select('_id name patients');
    if (!home) return null;

    const patientInfo = await patient.findById(pid);
    if (!patientInfo) return null;
    return { patient: patientInfo, home };
}

// Returns a report only when it belongs to one of the session's homes.
async function findAccessibleReport(session, reportId, filter = {}) {
    if (!mongoose.Types.ObjectId.isValid(reportId)) return null;
    const homeIds = await accessibleHomeIds(session);
    if (homeIds.length === 0) return null;

    return report.findOne({
        _id: new mongoose.Types.ObjectId(reportId),
        oldAgeHomeId: { $in: homeIds },
        ...filter,
    });
}

module.exports = {
    accessibleHomeIds,
    accessibleHomeObjectIds,
    isAccessibleHome,
    findAccessiblePatient,
    findAccessibleReport,
};
