
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFilmeIdiomas = async function (filmeIdiomas) {
    try {
        let sql = criarSql.INSERT('tbl_filme_idiomas', filmeIdiomas);

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

const updateFilmeIdiomas = async function (filmeIdiomas) {
    try {
        let sql = criarSql.UPDATE('tbl_filme_idiomas', filmeIdiomas);

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

const selectAllFilmeIdiomas = async function () {
    try {
        let sql = criarSql.SELECT('tbl_filme_idiomas');

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};

const selectByIdFilmeIdiomas = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_filme_idiomas', 'id', id);

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};

const deleteFilmeIdiomas = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_filme_idiomas', 'id', id);

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

const selectIdiomasByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_idiomas.*
                    from tbl_filmes
                        inner join tbl_filme_idiomas
                            on tbl_filmes.id = tbl_filme_idiomas.id_filme
                        inner join tbl_idiomas
                            on tbl_idiomas.id = tbl_filme_idiomas.id_idiomas 
                    where tbl_filmes.id=${idFilme}`;

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};

const selectFilmesByIdIdioma = async function (idIdioma) {
    try {
        let sql = ` select tbl_filmes.*
                    from tbl_filmes
                        inner join tbl_filme_idiomas
                            on tbl_filmes.id = tbl_filme_idiomas.id_filme
                        inner join tbl_idiomas
                            on tbl_idiomas.id = tbl_filme_idiomas.id_idiomas 
                    where tbl_idiomas.id=${idIdioma}`;

        let result = await knexConection.raw(sql);

        if (Array.isArray(result)) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};

const deleteIdiomasByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_filme_idiomas', 'id_filme', idFilme);

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
    insertFilmeIdiomas,
    updateFilmeIdiomas,
    selectAllFilmeIdiomas,
    selectByIdFilmeIdiomas,
    deleteFilmeIdiomas,
    selectIdiomasByIdFilme,
    selectFilmesByIdIdioma,
    deleteIdiomasByIdFilme
};