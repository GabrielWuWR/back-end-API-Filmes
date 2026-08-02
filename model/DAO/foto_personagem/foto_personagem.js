
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFotoPersonagem = async function (fotoPersonagem) {
    try {
        let sql = criarSql.INSERT('tbl_foto_personagem', fotoPersonagem);

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

const updateFotoPersonagem = async function (fotoPersonagem) {
    try {
        let sql = criarSql.UPDATE('tbl_foto_personagem', fotoPersonagem);

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

const selectAllFotoPersonagem = async function () {
    try {
        let sql = criarSql.SELECT('tbl_foto_personagem');

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

const selectByIdFotoPersonagem = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_foto_personagem', 'id', id);

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

const deleteFotoPersonagem = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_foto_personagem', 'id', id);

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

const selectFotosByIdPersonagem = async function (idPersonagem) {
    try {
        let sql = criarSql.SELECT('tbl_foto_personagem', 'id_personagem', idPersonagem);

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

const deleteFotosByIdPersonagem = async function (idPersonagem) {
    try {
        let sql = criarSql.DELETE('tbl_foto_personagem', 'id_personagem', idPersonagem);

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
    insertFotoPersonagem,
    updateFotoPersonagem,
    selectAllFotoPersonagem,
    selectByIdFotoPersonagem,
    deleteFotoPersonagem,
    selectFotosByIdPersonagem,
    deleteFotosByIdPersonagem
};