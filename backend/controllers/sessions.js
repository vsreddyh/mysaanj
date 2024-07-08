const logincaretaker = (req, res) => {
    req.session.oldageid="6687cc90dfb46fdd2abb5006"
    req.session.name="Keshav old age homes"
    req.session.type="Caretaker"
    res.json({id:req.session.id,name:req.session.name,type:req.session.type})
}
const checksession = (req, res) => {
    if(req.session.type){
        res.json({id:req.session.id,name:req.session.name,type:req.session.type})
    }
    else{
        res.json(null)
    }
}
module.exports = {
    logincaretaker,
    checksession
}