
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertAtorIdiomas = async function (atorIdiomas) {
    try {
        let sql = criarSql.INSERT('tbl_ator_idiomas', atorIdiomas);

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

const updateAtorIdiomas = async function (atorIdiomas) {
    try {
        let sql = criarSql.UPDATE('tbl_ator_idiomas', atorIdiomas);

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

const selectAllAtorIdiomas = async function () {
    try {
        let sql = criarSql.SELECT('tbl_ator_idiomas');

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

const selectByIdAtorIdiomas = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_ator_idiomas', "id", id);

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

const deleteAtorIdiomas = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_ator_idiomas', "id", id);

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

const selectIdiomasByIdAtor = async function (idAtor) {
    try {
        let sql = ` select tbl_idiomas.*
                    from tbl_ator
                        inner join tbl_ator_idiomas
                            on tbl_ator.id = tbl_ator_idiomas.id_ator
                        inner join tbl_idiomas
                            on tbl_idiomas.id = tbl_ator_idiomas.id_idiomas 
                    where tbl_ator.id=${idAtor}`;

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

const deleteIdiomasByIdAtor = async function (idAtor) {
    try {
        let sql = criarSql.DELETE('tbl_ator_idiomas', 'id_ator', idAtor);

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
    insertAtorIdiomas,
    updateAtorIdiomas,
    selectAllAtorIdiomas,
    selectByIdAtorIdiomas,
    deleteAtorIdiomas,
    selectIdiomasByIdAtor,
    deleteIdiomasByIdAtor
};