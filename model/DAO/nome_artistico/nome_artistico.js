const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertNomeArtistico = async function (nomeArtistico) {
    try {
        let sql = criarSql.INSERT('tbl_nome_artistico', nomeArtistico);

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

const updateNomeArtistico = async function (nomeArtistico) {
    try {
        let sql = criarSql.UPDATE('tbl_nome_artistico', nomeArtistico);

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

const selectAllNomesArtisticos = async function () {
    try {
        let sql = criarSql.SELECT('tbl_nome_artistico');

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

const selectByIdNomeArtistico = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_nome_artistico', 'id', id);

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

const deleteNomeArtistico = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_nome_artistico', 'id', id);

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

const selectNomesByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.SELECT('tbl_nome_artistico', 'id_pessoa', idPessoa);

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

const deleteNomesByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.DELETE('tbl_nome_artistico', 'id_pessoa', idPessoa);

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
    insertNomeArtistico,
    updateNomeArtistico,
    selectAllNomesArtisticos,
    selectByIdNomeArtistico,
    deleteNomeArtistico,
    selectNomesByIdPessoa,
    deleteNomesByIdPessoa
};