/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD dos generos de filmes
 * Data: 13/05/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

const knex = require('knex');
const knexConfig = require('../../../model/database_config/knexConfig.js');
const knexConection = knex(knexConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertTipoImagem = async function (tipoImagem) {
    try {
        let sql = criarSql.INSERT('tbl_tipo_imagem', tipoImagem);

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

const updateTipoImagem = async function (tipoImagem) {
    try {
        let sql = criarSql.UPDATE('tbl_tipo_imagem', tipoImagem);

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

const getAllTipoImagem = async function () {
    try {
        let sql = criarSql.SELECT('tbl_tipo_imagem');

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

const getTipoImagemById = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_tipo_imagem', 'id', id);

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

const deleteTipoImagem = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_tipo_imagem', 'id', id);

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
    insertTipoImagem,
    updateTipoImagem,
    getAllTipoImagem,
    getTipoImagemById,
    deleteTipoImagem
};