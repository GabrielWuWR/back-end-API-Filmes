
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertImagem = async function (imagem) {
    try {
        let sql = criarSql.INSERT('tbl_imagens', imagem);

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

const updateImagem = async function (imagem) {
    try {
        let sql = criarSql.UPDATE('tbl_imagens', imagem);

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

const selectAllImagens = async function () {
    try {
        let sql = criarSql.SELECT('tbl_imagens');

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

const selectByIdImagem = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_imagens', 'id', id);

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

const deleteImagem = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_imagens', 'id', id);

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

const selectImagensByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.SELECT('tbl_imagens', 'id_filme', idFilme);

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

const deleteImagensByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_imagens', 'id_filme', idFilme);

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
    insertImagem,
    updateImagem,
    selectAllImagens,
    selectByIdImagem,
    deleteImagem,
    selectImagensByIdFilme,
    deleteImagensByIdFilme
};