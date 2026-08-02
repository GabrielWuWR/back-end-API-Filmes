
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertPremio = async function (premio) {
    try {
        let sql = criarSql.INSERT('tbl_premio', premio);

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0].insertId;
        } else {
            return false;
        }

    } catch (error) {
        console.log(error)
        return false;
    }
};

const updatePremio = async function (premio) {
    try {
        let sql = criarSql.UPDATE('tbl_premio', premio);

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

const selectAllPremio = async function () {
    try {
        let sql = criarSql.SELECT('tbl_premio');

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

const selectByIdPremio = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_premio', 'id', id);

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

const deletePremio = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_premio', 'id', id);

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
    insertPremio,
    updatePremio,
    selectAllPremio,
    selectByIdPremio,
    deletePremio
};