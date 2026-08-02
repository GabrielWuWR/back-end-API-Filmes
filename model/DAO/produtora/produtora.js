/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD dos generos de filmes
 * Data: 13/05/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

const knex = require('knex');
const knexConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertProdutora = async function (produtora) {
    try {
        let sql = criarSql.INSERT('tbl_produtora', produtora);
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

const updateProdutora = async function (produtora) {
    try {
        let sql = criarSql.UPDATE('tbl_produtora', produtora);
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

const getAllProdutora = async function () {
    try {
        let sql = criarSql.SELECT('tbl_produtora');

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        };

    } catch (error) {
        return false;
    };
};

const getProdutoraById = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_produtora', 'id', id);

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

const deleteProdutora = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_produtora', 'id', id);

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = {
    insertProdutora,
    updateProdutora,
    getAllProdutora,
    getProdutoraById,
    deleteProdutora
};