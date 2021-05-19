const pg = require('../services/pgService')

module.exports = {
    async getRoles(req, res, next) {
        try {
            result = await pg.getPool().query("SELECT * FROM roles")
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    async createRole(req, res, next) {
        try {
            result = await pg.getPool().query(
                "INSERT INTO roles(name, description) VALUES ($1, $2) RETURNING *",
                [req.body.name, req.body.description])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    async updateRole(req, res, next) {
        try {
            result = await pg.getPool().query(
                "UPDATE roles SET name = $1, description = $2 WHERE ID = $3 RETURNING *",
                [req.body.name, req.body.description, req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    },
    async deleteRole(req, res, next) {
        try {
            result = await pg.getPool().query(
                "DELETE FROM roles WHERE ID = $1 RETURNING *",
                [req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}