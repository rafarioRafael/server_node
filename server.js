const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/', routes);

/* const path = require('path');
const fs = require('fs');
const { request } = require('http');

const dbPath = path.resolve(__dirname, './controllers db/facts.json');

 */

app.listen(3000, () => {
    console.warn('Servidor rodando na porta 3000...')
});
