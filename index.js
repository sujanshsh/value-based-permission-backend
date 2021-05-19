const express = require('express')
const cors = require('cors')
const rolesController = require('./controllers/roles.controller')

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/roles', rolesController.getRoles)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})