
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertTrailer = async function (trailer) {
    try {
        let sql = criarSql.INSERT('tbl_trailers', trailer);

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

const updateTrailer = async function (trailer) {
    try {
        let sql = criarSql.UPDATE('tbl_trailers', trailer);

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

const selectAllTrailers = async function () {
    try {
        let sql = criarSql.SELECT('tbl_trailers');

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

const selectByIdTrailer = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_trailers', 'id', id);

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

const deleteTrailer = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_trailers', 'id', id);

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

const selectTrailersByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.SELECT('tbl_trailers', 'id_filme', idFilme);

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

const deleteTrailersByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_trailers', 'id_filme', idFilme);

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
    insertTrailer,
    updateTrailer,
    selectAllTrailers,
    selectByIdTrailer,
    deleteTrailer,
    selectTrailersByIdFilme,
    deleteTrailersByIdFilme
};