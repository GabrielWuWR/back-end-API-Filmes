/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados de status do filme no 
 *           banco de dados MySQL.
 * Data: 15/04/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertStatusFilme = async function (statusFilme) {
    try {
        let sql = criarSql.INSERT('tbl_status_filme', statusFilme);

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

const updateStatusFilme = async function (statusFilme) {
    try {
        let sql = criarSql.UPDATE('tbl_status_filme', statusFilme);

        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        };
    } catch (error) {
        return false;
    };
};

const selectAllStatusFilme = async function () {
    try {
        let sql = criarSql.SELECT('tbl_status_filme');

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

const selectStatusFilmeById = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_status_filme', 'id', id);

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

const deleteStatusFilme = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_status_filme', 'id', id);

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = {
    insertStatusFilme,
    updateStatusFilme,
    selectAllStatusFilme,
    selectStatusFilmeById,
    deleteStatusFilme
};