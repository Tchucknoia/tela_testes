const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/html/tela_senha.html'));
});

module.exports = router;