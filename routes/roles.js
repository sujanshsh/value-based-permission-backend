import express from 'express'
import RolesController from '../controllers/roles.controller.js'


const rolesRouter = express.Router()

rolesRouter.get('/roles', RolesController.getRoles)
rolesRouter.get('/roles/like', RolesController.getRolesLike)
rolesRouter.post('/roles', RolesController.createRole)
rolesRouter.put('/roles/:id', RolesController.updateRole)
rolesRouter.delete('/roles/:id', RolesController.deleteRole)

export default rolesRouter