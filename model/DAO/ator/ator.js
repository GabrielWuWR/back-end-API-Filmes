const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const camposEspeciais = {
    ordem_credito: { vazioNull: true }
};

const insertAtor = async function (ator) {
    try {
        let sql = criarSql.INSERT('tbl_ator', ator, camposEspeciais);

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

const updateAtor = async function (ator) {
    try {
        let sql = criarSql.UPDATE('tbl_ator', ator, camposEspeciais);

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

const selectAllAtores = async function () {
    try {
        let sql = criarSql.SELECT('tbl_ator');

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

const selectByIdAtor = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_ator', "id", id);

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

const deleteAtor = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_ator', "id", id);

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

const selectAtoresByIdParticipacao = async function (idParticipacao) {
    try {
        let sql = criarSql.SELECT('tbl_ator', 'id_participacao', idParticipacao);

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

const deleteAtoresByIdParticipacao = async function (idParticipacao) {
    try {
        let sql = criarSql.DELETE('tbl_ator', "id_participacao", idParticipacao);

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
    insertAtor,
    updateAtor,
    selectAllAtores,
    selectByIdAtor,
    deleteAtor,
    selectAtoresByIdParticipacao,
    deleteAtoresByIdParticipacao
};