/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD das classificações de filmes
 * Data: 13/05/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

//Importando o knex
const knex = require('knex');

//Importando o arquivo de configuração do banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js');

//Chamando a conexão com o banco de dados
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../UTILS/criadorSql.js');

const insertClassificacao = async function (classificacao) {
    try {
        let sql = criarSql.INSERT('tbl_classificacao', classificacao);

        let result = await knexConection.raw(sql);

        if(result) {
            return result[0].insertId;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }
};

const updateClassificacao = async function (classificacao) {
    try {
        let sql = criarSql.UPDATE('tbl_classificacao', classificacao);

        let result = await knexConection.raw(sql);

        if(result) {
            return true;
        } else {
            return false;
        };
    } catch (error) {
        return false;
    };
};

const selectAllClassificacao = async function () {
    try {
        let sql = criarSql.SELECT('tbl_classificacao');

        let result = await knexConection.raw(sql);

        if(Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        };

    } catch (error) {
        return false;
    };

};

const selectByIdClassificacao = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_classificacao', 'id', id);

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

const deleteClassificacao = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_classificacao', 'id', id);
        
        let result = knexConection.raw(sql);

        if(result) {
            return true;
        } else {
            return false;
        }

    } catch (error) {
        return false;
    };
};

module.exports = {
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
};