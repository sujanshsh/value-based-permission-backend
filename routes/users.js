import express from 'express'
import usersController from './controllers/users.controller'


router = express.Router()

app.get('/users', usersController.getUsers)
app.post('/users', usersController.createUser)
app.put('/users/:id', usersController.updateUser)
app.delete('/users/:id', usersController.deleteUser)

export default router