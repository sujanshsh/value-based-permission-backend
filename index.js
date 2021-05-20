import express from 'express'
import cors from 'cors'
import rolesRouter from './routes/roles.js'
import usersRouter from './routes/users.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(rolesRouter)
app.use(usersRouter)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})