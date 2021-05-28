import express from 'express'
import UserPermissionsController from '../controllers/user_permissions.controller.js'


const userPermissionsRouter = express.Router()

userPermissionsRouter.get('/users/:id/permissions', UserPermissionsController.permissionsOfUser)

export default userPermissionsRouter