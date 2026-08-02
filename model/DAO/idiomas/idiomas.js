/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de idiomas
 * Data: 13/05/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

const knex = require('knex');
const knexConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexConfig.development);
const { criarSql } = require('../../../utils/criadorSql.js');

const insertIdioma = async function (idioma) {
    try {
        let sql = criarSql.INSERT('tbl_idiomas', idioma);

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

const updateIdioma = async function (idioma) {
    try {
        let sql = criarSql.UPDATE('tbl_idiomas', idioma);

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

const getAllIdioma = async function () {
    try {
        let sql = criarSql.SELECT('tbl_idiomas');

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

const getIdiomaById = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_idiomas', 'id', id);

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

const deleteIdioma = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_idiomas', 'id', id);

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
    insertIdioma,
    updateIdioma,
    getAllIdioma,
    getIdiomaById,
    deleteIdioma
};