import express from 'express'
import rolesController from './controllers/roles.controller'


router = express.Router()

app.get('/roles', rolesController.getRoles)
app.post('/roles', rolesController.createRole)
app.put('/roles/:id', rolesController.updateRole)
app.delete('/roles/:id', rolesController.deleteRole)

export default router