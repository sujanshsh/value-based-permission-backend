import express from 'express'
import PermissionsController from '../controllers/permissions.controller.js'


const permissionsRouter = express.Router()

permissionsRouter.get('/permissions', PermissionsController.getPermissions)
permissionsRouter.post('/permissions', PermissionsController.createPermission)
permissionsRouter.put('/permissions/:id', PermissionsController.updatePermission)
permissionsRouter.delete('/permissions/:id', PermissionsController.deletePermission)

export default permissionsRouter