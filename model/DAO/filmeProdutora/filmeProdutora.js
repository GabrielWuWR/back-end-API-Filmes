
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFilmeProdutora = async function (filmeProdutora) {
    try {
        let sql = criarSql.INSERT('tbl_filme_produtora', filmeProdutora);

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

const updateFilmeProdutora = async function (filmeProdutora) {
    try {
        let sql = criarSql.UPDATE('tbl_filme_produtora', filmeProdutora);

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

const selectAllFilmeProdutora = async function () {
    try {
        let sql = criarSql.SELECT('tbl_filme_produtora');

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

const selectByIdFilmeProdutora = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_filme_produtora', 'id', id);

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

const deleteFilmeProdutora = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_filme_produtora', 'id', id);

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

const selectProdutorasByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_produtora.*
                    from tbl_filmes
                        inner join tbl_filme_produtora
                            on tbl_filmes.id = tbl_filme_produtora.id_filme
                        inner join tbl_produtora
                            on tbl_produtora.id = tbl_filme_produtora.id_produtora 
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

const selectFilmesByIdProdutora = async function (idProdutora) {
    try {
        let sql = ` select tbl_filmes.*
                    from tbl_filme
                        inner join tbl_filme_produtora
                            on tbl_filmes.id = tbl_filme_produtora.id_filme
                        inner join tbl_produtora
                            on tbl_produtora.id = tbl_filme_produtora.id_produtora 
                    where tbl_produtora.id=${idProdutora}`;

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

const deleteProdutorasByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_filme_produtora', 'id_filme', idFilme);

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
    insertFilmeProdutora,
    updateFilmeProdutora,
    selectAllFilmeProdutora,
    selectByIdFilmeProdutora,
    deleteFilmeProdutora,
    selectProdutorasByIdFilme,
    selectFilmesByIdProdutora,
    deleteProdutorasByIdFilme
};