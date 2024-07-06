const logincaretaker = (req, res) => {
    req.session.id="6687cc90dfb46fdd2abb5006"
    res.json({id:"6687cc90dfb46fdd2abb5006"})
}
const checksession = (req, res) => {
    if(req.session.id){
        res.json(true)
    }
    else{
        res.json(false)
    }
}
module.exports = {
    logincaretaker,
    checksession
}