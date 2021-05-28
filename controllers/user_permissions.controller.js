import getPool from '../services/pgService.js'

export default class UserPermissionsController {

    static async permissionsOfUser(req, res, next) {
        try {

            let extraWhereConditions = ''
            let whereConditions = []
            let index = 1
            let bindVars = [req.params.id]
            if (req.query.permission_ids) {
                whereConditions.push(`p.id IN (${req.query.permission_ids})`)
            }
            if (whereConditions.length > 0) {
                extraWhereConditions = 'AND ' + whereConditions.join(' AND ')
            }

            const result = await getPool().query(
                `SELECT 
                    p.*,
                    r.id role_id,
                    r.name role_name,
                    vt.name value_type_name
                FROM user_roles ur
                    INNER JOIN role_permissions rp ON (rp.role_id = ur.role_id)
                    INNER JOIN permissions p ON (p.id = rp.permission_id)
                    INNER JOIN roles r ON (r.id = ur.role_id)
                    LEFT JOIN value_types vt ON (vt.id = p.value_type_id)
                WHERE 
                    ur.user_id = $1
                    ${extraWhereConditions}
                   `,
                bindVars)
            res.send(result.rows)
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }
}