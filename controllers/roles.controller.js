const pg = require('../services/pgService')

module.exports = {
    async getRoles(req, res, next) {
        try {
            result = await pg.getPool().query("SELECT * FROM roles")
            res.send(result.rows)
        } catch (err) {
            console.log(res)
            res.status(500).json({
                message: err.message
            })
            return
        }
    }
}