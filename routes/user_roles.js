import express from 'express'
import UserRolesController from '../controllers/user_roles.controller.js'


const userRolesRouter = express.Router()

userRolesRouter.get('/user-roles', UserRolesController.getUserRoles)
userRolesRouter.post('/user-roles', UserRolesController.createUserRole)
userRolesRouter.put('/user-roles/:id', UserRolesController.updateUserRole)
userRolesRouter.delete('/user-roles/:id', UserRolesController.deleteUserRole)
userRolesRouter.get('/users/:id/roles', UserRolesController.rolesOfUser)

export default userRolesRouter