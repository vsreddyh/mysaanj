const router = require('express').Router();
const {getReport, getReports, getPatient,getPatientCard,addkey,deletekey, setPatient, getPatients, getOldageHomeInfo,getDoctorInfo, count, reviewreport} = require('./controllers/get_set')
const {logincaretaker,logindoctor, checksession,deletesession} = require('./controllers/sessions')
const {uploadpdf,pdfid} = require('./controllers/LLM')

const requireSession = (req, res, next) => {
    if (!req.session || !req.session.type || !req.session.oldageid) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
};

// Public aggregate counter used by the landing screen; contains no PHI.
router.get('/count', count)

// Session endpoints are unauthenticated by design; everything below them
// requires a live session and is scoped to that session's old-age home(s).
router.post('/logincaretaker', logincaretaker)
router.post('/logindoctor', logindoctor)
router.get('/checksession', checksession)
router.post("/deletesession",deletesession)

router.use(requireSession)

router.get('/getreport', getReport)
router.get('/getreports', getReports)
router.post('/setPatient',setPatient)
router.get('/getpatient', getPatient)
router.get('/getpatientcard', getPatientCard)
router.get('/getpatients', getPatients)
router.get('/getoldagehomeinfo', getOldageHomeInfo)
router.get('/getdoctorinfo', getDoctorInfo)
router.post('/upload', uploadpdf)
router.get('/count', count)
router.post('/addkey',addkey)
router.post('/deletekey',deletekey)
router.post('/reviewreport',reviewreport)
router.get("/getpdf",pdfid)
module.exports = router
