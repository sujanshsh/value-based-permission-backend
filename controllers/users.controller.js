import getPool from '../services/pgService.js'
import crypto from 'crypto'

export default class UsersController {
    static async getUsers(req, res, next) {
        try {
            result = await getPool().query("SELECT * FROM users")
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async createUser(req, res, next) {
        try {
            const passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
            result = await getPool().query(
                "INSERT INTO users(email, name, passwordHash) VALUES ($1, $2, $3) RETURNING *",
                [req.body.email, req.body.name, passwordHash])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async updateUser(req, res, next) {
        try {
            const passwordHash = crypto.createHash('sha256').update(req.body.password).digest('hex');
            result = await getPool().query(
                "UPDATE users SET email = $1, name = $2, passwordHash = $3 WHERE ID = $4 RETURNING *",
                [req.body.email, req.body.name, passwordHash, req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async deleteUser(req, res, next) {
        try {
            result = await getPool().query(
                "DELETE FROM users WHERE ID = $1 RETURNING *",
                [req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}