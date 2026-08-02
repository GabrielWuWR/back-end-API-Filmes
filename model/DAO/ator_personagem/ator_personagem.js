
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertAtorPersonagem = async function (atorPersonagem) {
    try {
        let sql = criarSql.INSERT('tbl_ator_personagem', atorPersonagem);

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

const updateAtorPersonagem = async function (atorPersonagem) {
    try {
        let sql = criarSql.UPDATE('tbl_ator_personagem', atorPersonagem);

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

const selectAllAtorPersonagens = async function () {
    try {
        let sql = criarSql.SELECT('tbl_ator_personagem');

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

const selectByIdAtorPersonagem = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_ator_personagem', 'id', id);

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

const deleteAtorPersonagem = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_ator_personagem', 'id', id);

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

const selectPersonagensByIdAtor = async function (idAtor) {
    try {
        let sql = ` select tbl_personagem.*
                    from tbl_ator
                        inner join tbl_ator_personagem
                            on tbl_ator.id = tbl_ator_personagem.id_ator
                        inner join tbl_personagem
                            on tbl_personagem.id = tbl_ator_personagem.id_personagem 
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

const deletePersonagensByIdAtor = async function (idAtor) {
    try {
        let sql = criarSql.DELETE('tbl_ator_personagem', 'id_ator', idAtor);

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
    insertAtorPersonagem,
    updateAtorPersonagem,
    selectAllAtorPersonagens,
    selectByIdAtorPersonagem,
    deleteAtorPersonagem,
    selectPersonagensByIdAtor,
    deletePersonagensByIdAtor
};