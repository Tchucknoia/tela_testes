const express = require('express');
const session = require('express-session');
const app = express();
const login_router = require("./routes/login_router.js");
const inicial_router = require("./routes/inicial_router.js");

const port = 80;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/', login_router);
app.use('/tela_inicial', inicial_router);

app.listen(port);

console.log(`Running at port: ${port}`);