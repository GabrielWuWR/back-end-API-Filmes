
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertPersonagem = async function (personagem) {
    try {
        let sql = criarSql.INSERT('tbl_personagem', personagem);

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

const updatePersonagem = async function (personagem) {
    try {
        let sql = criarSql.UPDATE('tbl_personagem', personagem);

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

const selectAllPersonagens = async function () {
    try {
        let sql = criarSql.SELECT('tbl_personagem');

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

const selectByIdPersonagem = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_personagem', 'id', id);

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

const deletePersonagem = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_personagem', 'id', id);

        let result = await knexConection.raw(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};

module.exports = {
    insertPersonagem,
    updatePersonagem,
    selectAllPersonagens,
    selectByIdPersonagem,
    deletePersonagem
};