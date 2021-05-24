import getPool from '../services/pgService.js'

export default class RolesController {
    static async getRoles(req, res, next) {
        try {
            let whereClause = ''
            let whereCondition = ''
            let index = 0
            let bindVars = []
            if (req.query.name) {
                index++
                whereCondition += `name = $${index}`
                bindVars.push(req.query.name)
            }
            if (req.query.description) {
                index++
                whereCondition += `description = $${index}`
                bindVars.push(req.query.description)
            }
            if (whereCondition) {
                whereClause = `WHERE ${whereCondition}`
            }
            const result = await getPool().query(`SELECT * FROM roles ${whereClause}`, bindVars)
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async getRolesLike(req, res, next) {
        try {
            let whereClause = ''
            let whereConditions = []
            let index = 0
            let bindVars = []
            if (req.query.name) {
                index++
                whereConditions.push(`name LIKE $${index}`)
                bindVars.push(req.query.name + '%')
            }
            if (req.query.description) {
                index++
                whereConditions.push(`description LIKE $${index}`)
                bindVars.push(req.query.description + '%')
            }
            if (whereConditions.length > 0) {
                whereClause = 'WHERE ' + whereConditions.join(' OR ')
            }
            const result = await getPool().query(`SELECT * FROM roles ${whereClause}`, bindVars)
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async createRole(req, res, next) {
        try {
            const result = await getPool().query(
                "INSERT INTO roles(name, description) VALUES ($1, $2) RETURNING *",
                [req.body.name, req.body.description])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async updateRole(req, res, next) {
        try {
            const result = await getPool().query(
                "UPDATE roles SET name = $1, description = $2 WHERE ID = $3 RETURNING *",
                [req.body.name, req.body.description, req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async deleteRole(req, res, next) {
        try {
            const result = await getPool().query(
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