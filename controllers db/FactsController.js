const path = require('path');
const fs = require('fs');
const dbPath = path.resolve(__dirname, '../controllers db/facts.json');

class FactsController {
    index(request, response){
        try{
            const data = fs.readFileSync(dbPath, 'utf8')
            const facts = JSON.parse(data)
            return response.status(200).json(facts)
        } catch(e) {
            console.log(e)
            return response.status(500).json({erro: 'Não foi possível executar esta operação!'})
        }
    }
    show(request, response){
        const { id } = request.params
    try{
        let data = fs.readFileSync(dbPath, 'utf8')
        let fact = null 
        data = JSON.parse(data)['facts']

        for (let index in data) {
            if (data[index]['id'] == id){
                fact = data[index]
                break
            }
        }
        if (fact === null){
            return response.status(404).json({erro: 'Nenhum fato foi encontrado!'})
        }   
        return response.json(fact)
    } catch(e) {
        console.log(e);
        return response.status(500).json({erro: 'Não foi possível executar está operação!'})
    }
    }
    create(request, response){
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
    }
    update(request, response){
        const { id } =  request.params
        const { text } =  request.body

        try {
            let data = fs.readFileSync(dbPath, 'utf8')
            let fact = null
            let indexFact = null
            data = JSON.parse(data)

            for (let index in data['facts']) {
                if (data['facts'][index]['id'] == id) {
                    fact = data['facts'][index]
                    indexFact = index
                    break
                }
            }
            if (fact === null) {
                return response.status(404).json({erro: 'Nenhum fato foi encontrado!'})
            }
            const updatedFact = {
                ...data['facts'][indexFact],
                text: text,
            }
            data['facts'][indexFact] = updatedFact
            fs.writeFileSync(dbPath, JSON.stringify(data))
            return response.status(200).json(updatedFact)
        } catch(e) {
            console.log(e)
            return response.status(500).json({erro: 'Não foi possível executar  está operação!'})
        }
    }
    delete(request, response){
        const { id } = request.params
    try {
        let data = fs.readFileSync(dbPath, 'utf8')
        let indexFact =  null
        data = JSON.parse(data)

        for (let index in data['facts']) {
            if (data['facts'][index]['id'] == id) {
                indexFact = index
                break
            }
        }
        if (indexFact == null) {
            return response.status(404).json({erro: 'Nenhum fato foi encontrado!'})
        }
        data['facts'].splice(indexFact, 1)
        fs.writeFileSync(dbPath, JSON.stringify(data))
        return response.sendStatus(204)
        return response()
    } catch(e) {
        console.log(e)
        return response.status(500).json({erro: 'Não foi possível executar está operação!'})
    }
    }
}
module.exports = FactsController