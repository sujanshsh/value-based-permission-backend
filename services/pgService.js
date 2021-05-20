
import { Pool } from 'pg'

const pool = new Pool({
  user: 'accesscontrol',
  host: 'localhost',
  database: 'accesscontroldb',
  password: 'accesscontrol',
  port: 5432,
})

module.exports = {
    getPool() {
        return pool
    }
}