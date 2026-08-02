
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const camposEspeciais = {
    descricao: { vazioNull: true }
};

const insertOcupacao = async function (ocupacao) {
    try {
        let sql = criarSql.INSERT('tbl_ocupacoes', ocupacao, camposEspeciais);

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0].insertId;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
};

const updateOcupacao = async function (ocupacao) {
    try {
        let sql = criarSql.UPDATE('tbl_ocupacoes', ocupacao, camposEspeciais);

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

const selectAllOcupacoes = async function () {
    try {
        let sql = criarSql.SELECT('tbl_ocupacoes');

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

const selectByIdOcupacao = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_ocupacoes', 'id', id);

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

const deleteOcupacao = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_ocupacoes', 'id', id);

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
    insertOcupacao,
    updateOcupacao,
    selectAllOcupacoes,
    selectByIdOcupacao,
    deleteOcupacao
};