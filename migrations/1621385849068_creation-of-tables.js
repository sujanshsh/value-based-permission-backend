/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('roles', {
        id: 'id',
        name: { type: 'varchar(64)', notNull: true },
        description: { type: 'varchar(256)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: false,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createIndex('roles', 'name', {unique: true})

    pgm.createTable('value_types', {
        id: 'id',
        name: { type: 'varchar(64)', notNull: true },
        description: { type: 'varchar(256)', notNull: true },
        url: { type: 'varchar(512)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: false,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createIndex('value_types', 'name', {unique: true})

    pgm.createTable('permissions', {
        id: 'id',
        name: { type: 'varchar(256)', notNull: true },
        suffix: { type: 'varchar(128)', notNull: false },
        description: { type: 'varchar(256)', notNull: true },
        value_type_id: { type: 'int', notNull: false, references: 'value_types' },
        values: { type: 'varchar(1024)', notNull: false },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: false,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createIndex('permissions', ['name', 'suffix'], {unique: true})

    pgm.createTable('role_permissions', {
        id: 'id',
        role_id: { type: 'integer', notNull: true, references: 'roles' },
        permission_id: { type: 'integer', notNull: true, references: 'permissions' },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: false,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createIndex('role_permissions', 'role_id')
    pgm.createIndex('role_permissions', 'permission_id')

    pgm.createTable('users', {
        id: 'id',
        email: { type: 'varchar(128)', notNull: true},
        name: { type: 'varchar(64)', notNull: true },
        passwordHash: { type: 'varchar(512)', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: false,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createIndex('users', 'email', {unique: true})

    pgm.createTable('user_roles', {
        id: 'id',
        user_id: { type: 'integer', notNull: true, references: 'users' },
        role_id: { type: 'integer', notNull: true, references: 'roles' },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: {
            type: 'timestamp',
            notNull: false,
            default: pgm.func('current_timestamp'),
        }
    })
    pgm.createIndex('user_roles', 'user_id')
    pgm.createIndex('user_roles', 'role_id')
};

exports.down = pgm => {
    pgm.dropTable('roles', { ifExists: true, cascade: true})
    pgm.dropTable('value_types', { ifExists: true, cascade: true})
    pgm.dropTable('permissions', { ifExists: true, cascade: true})
    pgm.dropTable('role_permissions', { ifExists: true, cascade: true})
    pgm.dropTable('users', { ifExists: true, cascade: true})
    pgm.dropTable('user_roles', { ifExists: true, cascade: true})
};
