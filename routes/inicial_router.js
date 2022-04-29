const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const { route } = require('./login_router');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    if(req.session.loggedin){
        res.sendFile(path.join(__dirname + '/html/tela_inicial.html'));
    } else{
        res.redirect("/");
    }
});

router.post('/view_SCs',(req,res)=>{

});

module.exports = router;