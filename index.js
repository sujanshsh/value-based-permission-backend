const express = require('express')
const cors = require('cors')
const rolesController = require('./controllers/roles.controller')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/roles', rolesController.getRoles)
app.post('/roles', rolesController.createRole)
app.put('/roles/:id', rolesController.updateRole)
app.delete('/roles/:id', rolesController.deleteRole)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})