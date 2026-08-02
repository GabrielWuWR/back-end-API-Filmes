
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertSexo = async function (sexo) {
    try {
        let sql = criarSql.INSERT('tbl_sexo', sexo);

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

const updateSexo = async function (sexo) {
    try {
        let sql = criarSql.UPDATE('tbl_sexo', sexo);

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

const selectAllSexos = async function () {
    try {
        let sql = criarSql.SELECT('tbl_sexo');

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

const selectByIdSexo = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_sexo', 'id', id);

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

const deleteSexo = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_sexo', 'id', id);

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
    insertSexo,
    updateSexo,
    selectAllSexos,
    selectByIdSexo,
    deleteSexo
};