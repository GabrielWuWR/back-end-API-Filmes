
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const camposEspeciais = {
    descricao: { vazioNull: true }
};

const insertTipoAtuacao = async function (tipoAtuacao) {
    try {
        let sql = criarSql.INSERT('tbl_tipo_atuacao', tipoAtuacao, camposEspeciais);

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

const updateTipoAtuacao = async function (tipoAtuacao) {
    try {
        let sql = criarSql.UPDATE('tbl_tipo_atuacao', tipoAtuacao, camposEspeciais);

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

const selectAllTiposAtuacao = async function () {
    try {
        let sql = criarSql.SELECT('tbl_tipo_atuacao');

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

const selectByIdTipoAtuacao = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_tipo_atuacao', 'id', id);

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

const deleteTipoAtuacao = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_tipo_atuacao', 'id', id);

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
    insertTipoAtuacao,
    updateTipoAtuacao,
    selectAllTiposAtuacao,
    selectByIdTipoAtuacao,
    deleteTipoAtuacao
};