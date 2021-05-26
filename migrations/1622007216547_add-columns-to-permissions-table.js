/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns('permissions', {
        value_type_id: { type: 'int', notNull: false },
        suffix: { type: 'varchar(128)', notNull: false }
    })
};

exports.down = pgm => {
    pgm.dropColumns('permissions', [
        'value_type_id',
        'suffix'
    ])
};
