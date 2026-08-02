/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD da tabela intermediária filme_genero
 * Autor: Gabriel
 *****************************************************************************/

const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFilmeGenero = async function (filmeGenero) {
    try {
        let sql = criarSql.INSERT('tbl_filme_genero', filmeGenero);

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

const updateFilmeGenero = async function (filmeGenero) {
    try {
        let sql = criarSql.UPDATE('tbl_filme_genero', filmeGenero);

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

const selectAllFilmeGenero = async function () {
    try {
        let sql = criarSql.SELECT('tbl_filme_genero');

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

const selectByIdFilmeGenero = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_filme_genero', 'id', id);

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

const deleteFilmeGenero = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_filme_genero', 'id', id);

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

const selectGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_genero.*
                    from tbl_filmes
                        inner join tbl_filme_genero
                            on tbl_filmes.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero 
                    where tbl_filmes.id=${idFilme}`;

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

const selectFilmesByIdGenero = async function (idGenero) {
    try {
        let sql = ` select tbl_filmes.*
                    from tbl_filmes
                        inner join tbl_filme_genero
                            on tbl_filmes.id = tbl_filme_genero.id_filme
                        inner join tbl_genero
                            on tbl_genero.id = tbl_filme_genero.id_genero 
                    where tbl_genero.id=${idGenero}`;

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

const deleteGenerosByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_filme_genero', 'id_filme', idFilme);
        
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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero,
    deleteGenerosByIdFilme
};