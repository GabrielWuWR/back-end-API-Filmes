/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados do Filme no banco de dados
 *           MySQL.
 * Data: 15/04/2026
 * Autor: Gabriel José
 * Versão: 1.0.15.4
 *****************************************************************************/

//Import da biblioteca para manipular dados no banco de dados mysql
const knex = require('knex');

//import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require('../../database_config/knexConfig.js');

//Criar a conexão do banco de dados mysql conforme o arquivo de configuração.
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../UTILS/criadorSql.js');

const camposEspeciais = {
    valor: {vazioNull: true},
    avaliacao: { vazioNull: true },
    avaliacaoCritica: { vazioNull: true }
}

const insertFilme = async function (filme) {

    try {
        let sql = criarSql.INSERT('tbl_filmes', filme, camposEspeciais);

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0].insertId;
        } else {
            return false;
        };

    } catch (error) {
        console.log(error)
        return false;
    };
};

const updateFilme = async function (filme) {
    try {
        let sql = criarSql.UPDATE('tbl_filmes', filme, camposEspeciais);

        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        };

    } catch (error) {
        console.log(error)
        return false;
    };
};

const selectAllFilme = async function () {
    try {
        let sql = criarSql.SELECT('tbl_filmes');
        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        };

    } catch (error) {
        console.log(error);
        return false;
    }
};

const selectByIdFilme = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_filmes', 'id', id);
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

const deleteFilme = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_filmes', 'id', id);
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

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
};