import getPool from '../services/pgService.js'

export default class PermissionsController {
    static async getPermissions(req, res, next) {
        try {
            let whereClause = ''
            let whereConditions = []
            let index = 0
            let bindVars = []
            if (req.query.name) {
                index++
                whereConditions.push(`name = $${index}`)
                bindVars.push(req.query.name)
            }
            if (req.query.description) {
                index++
                whereConditions.push(`description = $${index}`)
                bindVars.push(req.query.description)
            }
            if (req.query.suffix) {
                index++
                whereConditions.push(`suffix = $${index}`)
                bindVars.push(req.query.suffix)
            }
            if (req.query.values) {
                index++
                whereConditions.push(`values = $${index}`)
                bindVars.push(req.query.values)
            }
            if (whereConditions.length > 0) {
                whereClause = 'WHERE ' + whereConditions.join(' AND ')
            }
            const result = await getPool().query(`SELECT * FROM permissions ${whereClause}`, bindVars)
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async getPermissionsLike(req, res, next) {
        try {
            let whereClause = ''
            let whereConditions = []
            let index = 0
            let bindVars = []
            if (req.query.name) {
                index++
                whereConditions.push(`LOWER(name) LIKE $${index}`)
                bindVars.push(req.query.name.toLowerCase() + '%')
            }
            if (req.query.description) {
                index++
                whereConditions.push(`LOWER(description) LIKE $${index}`)
                bindVars.push(req.query.description.toLowerCase() + '%')
            }
            if (req.query.suffix) {
                index++
                whereConditions.push(`suffix LIKE $${index}`)
                bindVars.push(req.query.suffix.toLowerCase() + '%')
            }
            if (req.query.values) {
                index++
                whereConditions.push(`LOWER(values) LIKE $${index}`)
                bindVars.push(req.query.values.toLowerCase() + '%')
            }
            if (whereConditions.length > 0) {
                whereClause = 'WHERE ' + whereConditions.join(' OR ')
            }
            const result = await getPool().query(`SELECT * FROM permissions ${whereClause}`, bindVars)
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