import getPool from '../services/pgService.js'


export default class UserRolesController {
    static async getUserRoles(req, res, next) {
        try {
            const result = await getPool().query("SELECT * FROM user_roles")
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async createUserRoles(req, res, next) {
        try {
            const result = await getPool().query(
                "INSERT INTO user_roles(user_id, role_id) VALUES ($1, $2, $3) RETURNING *",
                [req.body.user_id, req.body.role_id, passwordHash])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async updateUserRoles(req, res, next) {
        try {
            const result = await getPool().query(
                "UPDATE user_roles SET user_id = $1, role_id = $2 WHERE ID = $3 RETURNING *",
                [req.body.user_id, req.body.role_id, req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async deleteUserRoles(req, res, next) {
        try {
            const result = await getPool().query(
                "DELETE FROM user_roles WHERE ID = $1 RETURNING *",
                [req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}