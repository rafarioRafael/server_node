const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const path = require('path');
const fs = require('fs');
const { request } = require('http');

const dbPath = path.resolve(__dirname, './controllers db/facts.json');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/:id', (request, response) => {
    const { id } = request.params
    try{
        const data = fs.readFileSync(dbPath, 'utf8')
        let fact = null 
        data = JSON.parse(data)['facts']

        for (let index in data) {
            if (data[index]['id'] == id){
                fact = data[index]
                break
            }
        }
        if (fact === null){
            return response
            .status(404)
            .json({erro: 'Nenhum fato foi encontrado!'})
        }
        return response.json(fact)
    } catch(e) {
        console.log(e);
        return response.status(500).json({erro: 'Não foi possível executar está operação!'})
    }
});

app.post ('/', (request, response) => {
    const { text } = request.body
    try {
        let data = fs.readFileSync(dbPath, 'utf8')
        data = JSON.parse(data)
        const newFact = {
            id: String(data['facts'].length + 1),
            text: text,
            type: 'cat',
            upvotes: 0,
        }
        data['facts'].push(newFact)
        fs.writeFileSync(dbPath, JSON.stringify(data))
        return response.json(newFact)
    } catch(e) {
        console.log(e)
        return response.status(500).json({erro: 'Não foi possível executar está operação!'})
    }
})
app.listen(3000, () => {
    console.warn('Servidor rodando na porta 3000...')
});
