
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const camposEspeciais = {
    data_falecimento: { vazioNull: true },
    biografia: { vazioNull: true },
    altura: { vazioNull: true },
    cidade_natal: { vazioNull: true },
    ano_inicio_carreira: { vazioNull: true }
};

const insertPessoa = async function (pessoa) {
    try {
        let sql = criarSql.INSERT('tbl_pessoa', pessoa, camposEspeciais);

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

const updatePessoa = async function (pessoa) {
    try {
        let sql = criarSql.UPDATE('tbl_pessoa', pessoa, camposEspeciais);

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

const selectAllPessoas = async function () {
    try {
        let sql = criarSql.SELECT('tbl_pessoa');

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

const selectByIdPessoa = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_pessoa', 'id', id);

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

const deletePessoa = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa', 'id', id);

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
    insertPessoa,
    updatePessoa,
    selectAllPessoas,
    selectByIdPessoa,
    deletePessoa
};