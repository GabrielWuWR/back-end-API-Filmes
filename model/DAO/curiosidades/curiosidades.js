
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertCuriosidade = async function (curiosidade) {
    try {
        let sql = criarSql.INSERT('tbl_curiosidades', curiosidade);
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

const updateCuriosidade = async function (curiosidade) {
    try {
        let sql = criarSql.UPDATE('tbl_curiosidades', curiosidade);
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

const selectAllCuriosidades = async function () {
    try {
        let sql = criarSql.SELECT('tbl_curiosidades');
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

const selectByIdCuriosidade = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_curiosidades', 'id', id);
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

const deleteCuriosidade = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_curiosidades', 'id', id);
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
    insertCuriosidade,
    updateCuriosidade,
    selectAllCuriosidades,
    selectByIdCuriosidade,
    deleteCuriosidade
};