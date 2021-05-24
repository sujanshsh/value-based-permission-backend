import express from 'express'
import RolePermissionsController from '../controllers/role_permissions.controller.js'


const rolePermissionsRouter = express.Router()

rolePermissionsRouter.get('/role-permissions', RolePermissionsController.getRolePermissions)
rolePermissionsRouter.post('/role-permissions', RolePermissionsController.createRolePermission)
rolePermissionsRouter.put('/role-permissions/:id', RolePermissionsController.updateRolePermission)
rolePermissionsRouter.delete('/role-permissions/:id', RolePermissionsController.deleteRolePermission)
rolePermissionsRouter.get('/roles/:id/permissions', RolePermissionsController.deleteRolePermission)

export default rolePermissionsRouter