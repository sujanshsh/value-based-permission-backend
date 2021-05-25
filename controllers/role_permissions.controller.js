import getPool from '../services/pgService.js'

export default class RolePermissionsController {
    static async getRolePermissions(req, res, next) {
        try {
            const result = await getPool().query("SELECT * FROM role_permissions")
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async createRolePermission(req, res, next) {
        try {
            const result = await getPool().query(
                "INSERT INTO role_permissions(role_id, permission_id) VALUES ($1, $2) RETURNING *",
                [req.body.role_id, req.body.permission_id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async updateRolePermission(req, res, next) {
        try {
            const result = await getPool().query(
                "UPDATE role_permissions SET role_id = $1, permission_id = $2 WHERE ID = $3 RETURNING *",
                [req.body.role_id, req.body.permission_id, req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async deleteRolePermission(req, res, next) {
        try {
            const result = await getPool().query(
                "DELETE FROM role_permissions WHERE ID = $1 RETURNING *",
                [req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    static async permissionsOfRole(req, res, next) {
        try {
            const result = await getPool().query(
                `SELECT 
                    p.* 
                FROM role_permissions rp
                    INNER JOIN permissions p ON (rp.permission_id = p.id)
                  WHERE 
                  rp.role_id = $1
                   `,
                [req.params.id])
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}