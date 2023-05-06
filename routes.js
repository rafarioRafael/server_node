const router = require('express').Router()
const FactsController = require('./controllers db/FactsController')
const factsController = new FactsController()

router.get('/', factsController.index)
router.get('/:id', factsController.show)
router.post('/', factsController.create)
router.put('/:id', factsController.update)
router.delete('/:id', factsController.delete)

module.exports = router