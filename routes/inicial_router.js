const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const util = require("util");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

function conectar() {
    return new Promise((resolve, rejects) => {

        let connection = mysql.createConnection({
            host: process.env.host,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database,
            dateStrings: true
        });

        connection.connect(err => {
            if (err) {
                rejects(err);
            } else {
                resolve(connection)
            }
        });
    })
}

router.get('/', function (req, res) {
    if (req.session.loggedin) {
        res.sendFile(path.join(__dirname + '/html/tela_inicial.html'));
    } else {
        res.redirect("/");
    }
});

router.post('/view_SCs', (req, res) => {

});

router.post('/logout', (req, res) => {
    /*
    console.log("asd");
    req.session.loggedin = false;
    req.session.email = '';
    let backURL = req.header('Referer') || '/';
    console.log(`backURL:${backURL}`);
    res.redirect("back");-
    */
});

router.post("/cadastrar", async (req, res) => {
    console.log(req.body);
    let jSend = {
        "dados":null,
        "cMensagemErro": null
    };
    let db;

    try {
        db = await conectar();
    } catch (err) {
        if (err) {
            if (err.code == "ECONNREFUSED") {
                console.log("Servidor OFFLINE");
                jSend.cMensagemErro = err.code;
                res.send(jSend);
                return;
            } else {
                throw err;
            }
        }
    }
    const query = util.promisify(db.query).bind(db);
    try {
        let results = await query("SELECT sc_number FROM solicitacoes_compra WHERE sc_number = ? ", [req.body["Numero_input"]])
        if (results.length > 0) {
            jSend.cMensagemErro = "SC já existente";
            return;
        }
        results = await query('INSERT INTO solicitacoes_compra (sc_number, sector, author, created_data, description, has_irregularity, desc_irregularity, was_excluded) VALUES(?, ?, ?, ?, ?, 0, null, 0);', [
            req.body["Numero_input"],
            req.body["Setor_input"],
            req.body["Autor_input"],
            req.body["Data_input"],
            req.body["Descricao_input"]
        ]);
        console.log(results);
    } catch (err) {
        throw err;
    } finally {
        db.end();
        res.send(jSend);
    }

});

router.post("/procurar", async (req, res) => {
    //console.log(req.body);
    let jSend = {
        "cMensagemErro": null
    };
    let db;

    try {
        db = await conectar();
    } catch (err) {
        if (err) {
            if (err.code == "ECONNREFUSED") {
                console.log("Servidor OFFLINE");
                jSend.cMensagemErro = err.code;
                res.send(jSend);
                return;
            } else {
                throw err;
            }
        }
    }
    const query = util.promisify(db.query).bind(db);
    try {
        let mysqlColunas = {
            "Numero_input" : "sc_number",
            "Setor_input" : "sector",
            "Autor_input" : "author",
            "Data_input" : "created_data",
            "Descricao_input" : "description"
        };
        let colunas = [
            "Numero_input",
            "Setor_input",
            "Autor_input",
            "Data_input",
            "Descricao_input"
        ];
        let cComandoQuery = "SELECT * FROM solicitacoes_compra WHERE ";
        let jDados = req.body;
        let bFirst = false;
        for(let i=0;i<colunas.length;i++){
            if(jDados[colunas[i]] != ""){
                if(!bFirst){
                    bFirst = true;
                } else{
                    cComandoQuery += `OR `;
                }
                cComandoQuery += `${mysqlColunas[colunas[i]]} LIKE "%${jDados[colunas[i]]}%" `;
            }
        }
        if(!bFirst) cComandoQuery = "SELECT * FROM solicitacoes_compra";

        //console.log(cComandoQuery);
        let results = await query(cComandoQuery);
        let dados = [];
        for(const row of results){
            let a = row.created_data.slice(0,10);
            let jTemp = {
                "numero_SC" : row.sc_number,
                "setor" : row.sector,
                "autor" : row.author,
                "data" : `${a.slice(8,10)}/${a.slice(5,7)}/${a.slice(0,4)}`,
                "descricao" : row.description
            };
            
            //console.log(jTemp);
            dados.push(jTemp)
        }
        jSend.dados = dados;
        //console.log(dados);
    } catch (err) {
        throw err;
    } finally {
        db.end();
        res.send(jSend);
    }

});

module.exports = router;