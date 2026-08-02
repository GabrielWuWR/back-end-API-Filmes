
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFotoPessoa = async function (fotoPessoa) {
    try {
        let sql = criarSql.INSERT('tbl_foto_pessoa', fotoPessoa);

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

const updateFotoPessoa = async function (fotoPessoa) {
    try {
        let sql = criarSql.UPDATE('tbl_foto_pessoa', fotoPessoa);

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

const selectAllFotoPessoa = async function () {
    try {
        let sql = criarSql.SELECT('tbl_foto_pessoa');

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

const selectByIdFotoPessoa = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_foto_pessoa', 'id', id);

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

const deleteFotoPessoa = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_foto_pessoa', 'id', id);

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

const selectFotosByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.SELECT('tbl_foto_pessoa', 'id_pessoa', idPessoa);

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

const deleteFotosByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.DELETE('tbl_foto_pessoa', 'id_pessoa', idPessoa);

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
    insertFotoPessoa,
    updateFotoPessoa,
    selectAllFotoPessoa,
    selectByIdFotoPessoa,
    deleteFotoPessoa,
    selectFotosByIdPessoa,
    deleteFotosByIdPessoa
};