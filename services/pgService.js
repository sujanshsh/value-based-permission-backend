
import pg_pkg from 'pg'
const { Pool } = pg_pkg

const pool = new Pool({
  user: 'accesscontrol',
  host: 'localhost',
  database: 'accesscontroldb',
  password: 'accesscontrol',
  port: 5432,
})

const getPool = () => {
    return pool
}

export default getPool
