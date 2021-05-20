import express from 'express'

import UsersController from '../controllers/users.controller.js'


const usersRouter = express.Router()


usersRouter.get('/users', UsersController.getUsers)
usersRouter.post('/users', UsersController.createUser)
usersRouter.put('/users/:id', UsersController.updateUser)
usersRouter.delete('/users/:id', UsersController.deleteUser)

export default usersRouter