import express from 'express'
import cors from 'cors'
import rolesRouter from './routes/roles.js'
import usersRouter from './routes/users.js'
import permissionsRouter from './routes/permissions.js'
import rolePermissionsRouter from './routes/role_permissions.js'
import userRolesRouter from './routes/user_roles.js'
import valueTypesRouter from './routes/value_types.js'
import sampleValuesRouter from './routes/sample_values.js'

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
app.use(permissionsRouter)
app.use(rolePermissionsRouter)
app.use(userRolesRouter)
app.use(valueTypesRouter)
app.use(sampleValuesRouter)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})