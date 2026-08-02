
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFilmePremio = async function (filmePremio) {
    try {
        let sql = criarSql.INSERT('tbl_filme_premio', filmePremio);

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

const updateFilmePremio = async function (filmePremio) {
    try {
        let sql = criarSql.UPDATE('tbl_filme_premio', filmePremio);

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

const selectAllFilmePremio = async function () {
    try {
        let sql = criarSql.SELECT('tbl_filme_premio');

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

const selectByIdFilmePremio = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_filme_premio', 'id', id);

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

const deleteFilmePremio = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_filme_premio', 'id', id);

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

const selectPremiosByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_premio.*
                    from tbl_filmes
                        inner join tbl_filme_premio
                            on tbl_filmes.id = tbl_filme_premio.id_filme
                        inner join tbl_premio
                            on tbl_premio.id = tbl_filme_premio.id_premio 
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

const selectFilmesByIdPremio = async function (idPremio) {
    try {
        let sql = ` select tbl_filmes.*
                    from tbl_filmes
                        inner join tbl_filme_premio
                            on tbl_filmes.id = tbl_filme_premio.id_filme
                        inner join tbl_premio
                            on tbl_premio.id = tbl_filme_premio.id_premio 
                    where tbl_premio.id=${idPremio}`;

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

const deletePremiosByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_filme_premio', 'id_filme', idFilme);

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
    insertFilmePremio,
    updateFilmePremio,
    selectAllFilmePremio,
    selectByIdFilmePremio,
    deleteFilmePremio,
    selectPremiosByIdFilme,
    selectFilmesByIdPremio,
    deletePremiosByIdFilme
};