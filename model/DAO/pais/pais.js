/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD dos paises
 * Data: 13/05/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

const knex = require('knex');
const knexConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');


const insertPais = async function (pais) {
    try {
        let sql = criarSql.INSERT('tbl_pais', pais);

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0].insertId;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};

const updatePais = async function (pais) {
    try {
        let sql = criarSql.UPDATE('tbl_pais', pais);

        let result = await knexConection.raw(sql);

        if(result) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }

};

const getAllPais = async function () {
    try {
        let sql = criarSql.SELECT('tbl_pais');

        let result = await knexConection.raw(sql);

        if(Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const getPaisById = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_pais', 'id', id);

        let result = await knexConection.raw(sql);

        if(Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const deletePais = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_pais', 'id', id);

        let result = await knexConection.raw(sql);

        if(result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = {
    insertPais,
    updatePais,
    getAllPais,
    getPaisById,
    deletePais
};