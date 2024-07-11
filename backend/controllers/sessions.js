const logincaretaker = (req, res) => {
    req.session.oldageid="6687cc90dfb46fdd2abb5006"
    req.session.name="Keshav old age homes"
    req.session.type="Caretaker"
    res.json({id:req.session.oldageid,name:req.session.name,type:req.session.type})
}
const checksession = (req, res) => {
    try{
    if(req.session.type){
        res.json({oldageid:req.session.oldageid,name:req.session.name,type:req.session.type})
    }
    else{
        res.json(null)
    }
}
catch(e){
    res.error(e);
}
}
module.exports = {
    logincaretaker,
    checksession
}