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
                whereConditions.push(`p.name = $${index}`)
                bindVars.push(req.query.name)
            }
            if (req.query.description) {
                index++
                whereConditions.push(`p.description = $${index}`)
                bindVars.push(req.query.description)
            }
            if (req.query.suffix) {
                index++
                whereConditions.push(`p.suffix = $${index}`)
                bindVars.push(req.query.suffix)
            }
            if (req.query.values) {
                index++
                whereConditions.push(`p.values = $${index}`)
                bindVars.push(req.query.values)
            }
            if (whereConditions.length > 0) {
                whereClause = 'WHERE ' + whereConditions.join(' AND ')
            }
            const result = await getPool().query(
                `SELECT p.*, vt.name value_type_name
                FROM permissions p LEFT JOIN value_types vt ON (p.value_type_id = vt.id)
                ${whereClause}`,
                bindVars
            )
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
                whereConditions.push(`LOWER(p.name) LIKE $${index}`)
                bindVars.push(req.query.name.toLowerCase() + '%')
            }
            if (req.query.description) {
                index++
                whereConditions.push(`LOWER(p.description) LIKE $${index}`)
                bindVars.push(req.query.description.toLowerCase() + '%')
            }
            if (req.query.suffix) {
                index++
                whereConditions.push(`LOWER(p.suffix) LIKE $${index}`)
                bindVars.push(req.query.suffix.toLowerCase() + '%')
            }
            if (req.query.values) {
                index++
                whereConditions.push(`LOWER(p.values) LIKE $${index}`)
                bindVars.push(req.query.values.toLowerCase() + '%')
            }
            if (whereConditions.length > 0) {
                whereClause = 'WHERE ' + whereConditions.join(' OR ')
            }
            const result = await getPool().query(
                `SELECT p.*, vt.name
                FROM permissions p LEFT JOIN value_types vt ON (p.value_type_id = vt.id)
                ${whereClause}`,
                bindVars
            )
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
                "INSERT INTO permissions(name, description, suffix, value_type_id, values) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [req.body.name, req.body.description, req.body.suffix || '', parseInt(req.body.value_type_id) || null, req.body.values])
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
                "UPDATE permissions SET name = $1, suffix = $2, description = $3, value_type_id = $4, values = $5 WHERE ID = $6 RETURNING *",
                [req.body.name, req.body.suffix || '', req.body.description, req.body.value_type_id || null, 
                    req.body.values, req.params.id])
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