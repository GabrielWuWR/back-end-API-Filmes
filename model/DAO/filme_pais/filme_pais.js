
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFilmePais = async function (filmePais) {
    try {
        let sql = criarSql.INSERT('tbl_filme_pais', filmePais);

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

const updateFilmePais = async function (filmePais) {
    try {
        let sql = criarSql.UPDATE('tbl_filme_pais', filmePais);

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

const selectAllFilmePais = async function () {
    try {
        let sql = criarSql.SELECT('tbl_filme_pais');

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

const selectByIdFilmePais = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_filme_pais', 'id', id);

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

const deleteFilmePais = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_filme_pais', 'id', id);

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

const selectPaisesByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_pais.*, tbl_filme_pais.origem
                    from tbl_filmes
                        inner join tbl_filme_pais
                            on tbl_filmes.id = tbl_filme_pais.id_filme
                        inner join tbl_pais
                            on tbl_pais.id = tbl_filme_pais.id_pais 
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

const selectFilmesByIdPais = async function (idPais) {
    try {
        let sql = ` select tbl_filmes.*
                    from tbl_filmes
                        inner join tbl_filme_pais
                            on tbl_filmes.id = tbl_filme_pais.id_filme
                        inner join tbl_pais
                            on tbl_pais.id = tbl_filme_pais.id_pais 
                    where tbl_pais.id=${idPais}`;

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

const deletePaisesByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_filme_pais', 'id_filme', idFilme);

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
    insertFilmePais,
    updateFilmePais,
    selectAllFilmePais,
    selectByIdFilmePais,
    deleteFilmePais,
    selectPaisesByIdFilme,
    selectFilmesByIdPais,
    deletePaisesByIdFilme
};