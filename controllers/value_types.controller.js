import getPool from '../services/pgService.js'

export default class ValueTypesController {
    static async getValueTypes(req, res, next) {
        try {
            const result = await getPool().query("SELECT * FROM value_types")
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async createValueTypes(req, res, next) {
        try {
            const result = await getPool().query(
                "INSERT INTO value_types(name, description, url) VALUES ($1, $2, $3) RETURNING *",
                [req.body.name, req.body.description, req.body.url])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async updateValueTypes(req, res, next) {
        try {
            const result = await getPool().query(
                "UPDATE value_types SET name = $1, description = $2, url = $3 WHERE ID = $4 RETURNING *",
                [req.body.name, req.body.description, req.body.url, req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async deleteValueTypes(req, res, next) {
        try {
            const result = await getPool().query(
                "DELETE FROM value_types WHERE ID = $1 RETURNING *",
                [req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}