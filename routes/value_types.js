import express from 'express'
import ValueTypesController from '../controllers/value_types.controller.js'


const valueTypesRouter = express.Router()

valueTypesRouter.get('/value-types', ValueTypesController.getValueTypes)
valueTypesRouter.post('/value-types', ValueTypesController.createValueType)
valueTypesRouter.put('/value-types/:id', ValueTypesController.updateValueType)
valueTypesRouter.delete('/value-types/:id', ValueTypesController.deleteValueType)

export default valueTypesRouter