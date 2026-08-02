
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertSetor = async function (setor) {
    try {
        let sql = criarSql.INSERT('tbl_setor', setor);

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0].insertId;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const updateSetor = async function (setor) {
    try {
        let sql = criarSql.UPDATE('tbl_setor', setor);

        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const selectAllSetores = async function () {
    try {
        let sql = criarSql.SELECT('tbl_setor');

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const selectByIdSetor = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_setor', 'id', id);

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const deleteSetor = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_setor', 'id', id);

        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = {
    insertSetor,
    updateSetor,
    selectAllSetores,
    selectByIdSetor,
    deleteSetor
};