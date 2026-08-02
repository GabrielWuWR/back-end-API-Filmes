
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertFilmePersonagem = async function (filmePersonagem) {
    try {
        let sql = criarSql.INSERT('tbl_filme_personagem', filmePersonagem);

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

const updateFilmePersonagem = async function (filmePersonagem) {
    try {
        let sql = criarSql.UPDATE('tbl_filme_personagem', filmePersonagem);

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

const selectAllFilmePersonagem = async function () {
    try {
        let sql = criarSql.SELECT('tbl_filme_personagem');

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

const selectByIdFilmePersonagem = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_filme_personagem', 'id', id);

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

const deleteFilmePersonagem = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_filme_personagem', 'id', id);

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

const selectPersonagensByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_personagem.*
                    from tbl_filmes
                        inner join tbl_filme_personagem
                            on tbl_filmes.id = tbl_filme_personagem.id_filme
                        inner join tbl_personagem
                            on tbl_personagem.id = tbl_filme_personagem.id_personagem 
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

const selectFilmesByIdPersonagem = async function (idPersonagem) {
    try {
        let sql = ` select tbl_filmes.*
                    from tbl_filmes
                        inner join tbl_filme_personagem
                            on tbl_filmes.id = tbl_filme_personagem.id_filme
                        inner join tbl_personagem
                            on tbl_personagem.id = tbl_filme_personagem.id_personagem 
                    where tbl_personagem.id=${idPersonagem}`;

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

const deletePersonagensByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_filme_personagem', 'id_filme', idFilme);

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
    insertFilmePersonagem,
    updateFilmePersonagem,
    selectAllFilmePersonagem,
    selectByIdFilmePersonagem,
    deleteFilmePersonagem,
    selectPersonagensByIdFilme,
    selectFilmesByIdPersonagem,
    deletePersonagensByIdFilme
};