const router = require('express').Router();
const {getReport, getReports, getPatient, setPatient, getPatients, getOldageHomeInfo, count} = require('./controllers/get_set')
const {logincaretaker, checksession} = require('./controllers/sessions')
const {uploadReport} = require('./controllers/LLM')
router.get('/getreport', getReport)
router.get('/getreports', getReports)
router.post('/setPatient',setPatient)
router.get('/getpatient', getPatient)
router.get('/getpatients', getPatients)
router.get('/getoldagehomeinfo', getOldageHomeInfo)
router.post('/upload', uploadReport)
router.get('/count', count)
router.post('/logincaretaker', logincaretaker)
router.get('/checksession', checksession)

module.exports = router