/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD dos generos de filmes
 * Data: 13/05/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertGenero = async function (genero) {
    try {
        let sql = criarSql.INSERT('tbl_genero', genero);

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0].insertId
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

const updateGenero = async function (genero) {
    try {
        let sql = criarSql.UPDATE('tbl_genero', genero);

        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        };
    } catch (error) {
        return false;
    }
};

const selectAllGenero = async function () {
    try {
        let sql = criarSql.SELECT('tbl_genero');

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        };

    } catch (error) {
        return false;
    }
};

const selectByIdGenero = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_genero', 'id', id);

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

const deleteGenero = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_genero', 'id', id);

        let result = knexConection.raw(sql);

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
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero
};