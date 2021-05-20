import getPool from '../services/pgService.js'

export default class PermissionsController {
    static async getPermissions(req, res, next) {
        try {
            const result = await getPool().query("SELECT * FROM permissions")
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async createPermission(req, res, next) {
        try {
            const result = await getPool().query(
                "INSERT INTO permissions(name, description, values) VALUES ($1, $2, $3) RETURNING *",
                [req.body.name, req.body.description, req.body.values])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async updatePermission(req, res, next) {
        try {
            const result = await getPool().query(
                "UPDATE permissions SET name = $1, description = $2, values = $3 WHERE ID = $4 RETURNING *",
                [req.body.name, req.body.description, req.body.values, req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async deletePermission(req, res, next) {
        try {
            const result = await getPool().query(
                "DELETE FROM permissions WHERE ID = $1 RETURNING *",
                [req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}