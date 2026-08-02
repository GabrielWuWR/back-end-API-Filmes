
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertTecnica = async function (tecnica) {
    try {
        let sql = criarSql.INSERT('tbl_tecnica', tecnica);

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

const updateTecnica = async function (tecnica) {
    try {
        let sql = criarSql.UPDATE('tbl_tecnica', tecnica);

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

const selectAllTecnicas = async function () {
    try {
        let sql = criarSql.SELECT('tbl_tecnica');

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

const selectByIdTecnica = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_tecnica', 'id', id);

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

const deleteTecnica = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_tecnica', 'id', id);

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

const selectOcupacoesByIdParticipacao = async function (idParticipacao) {
    try {
        let sql = ` select tbl_ocupacoes.*
                    from tbl_participacao
                        inner join tbl_tecnica
                            on tbl_participacao.id = tbl_tecnica.id_participacao
                        inner join tbl_ocupacoes
                            on tbl_ocupacoes.id = tbl_tecnica.id_ocupacoes 
                    where tbl_participacao.id=${idParticipacao}`;

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

const deleteOcupacoesByIdParticipacao = async function (idParticipacao) {
    try {
        let sql = criarSql.DELETE('tbl_tecnica', 'id_participacao', idParticipacao);

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
    insertTecnica,
    updateTecnica,
    selectAllTecnicas,
    selectByIdTecnica,
    deleteTecnica,
    selectOcupacoesByIdParticipacao,
    deleteOcupacoesByIdParticipacao
};