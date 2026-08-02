
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertParticipacaoCuriosidade = async function (participacaoCuriosidade) {
    try {
        let sql = criarSql.INSERT('tbl_participacao_curiosidade', participacaoCuriosidade);

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

const updateParticipacaoCuriosidade = async function (participacaoCuriosidade) {
    try {
        let sql = criarSql.UPDATE('tbl_participacao_curiosidade', participacaoCuriosidade);

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

const selectAllParticipacaoCuriosidades = async function () {
    try {
        let sql = criarSql.SELECT('tbl_participacao_curiosidade');

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

const selectByIdParticipacaoCuriosidade = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_participacao_curiosidade', 'id', id);

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

const deleteParticipacaoCuriosidade = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_participacao_curiosidade', 'id', id);

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

const selectCuriosidadesByIdParticipacao = async function (idParticipacao) {
    try {
        let sql = ` select tbl_curiosidades.*
                    from tbl_participacao
                        inner join tbl_participacao_curiosidade
                            on tbl_participacao.id = tbl_participacao_curiosidade.id_participacao
                        inner join tbl_curiosidades
                            on tbl_curiosidades.id = tbl_participacao_curiosidade.id_curiosidades 
                    where tbl_participacao.id=${idParticipacao}`;

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

const selectParticipacoesByIdCuriosidade = async function (idCuriosidade) {
    try {
        let sql = ` select tbl_participacao.*
                    from tbl_participacao
                        inner join tbl_participacao_curiosidade
                            on tbl_participacao.id = tbl_participacao_curiosidade.id_participacao
                        inner join tbl_curiosidades
                            on tbl_curiosidades.id = tbl_participacao_curiosidade.id_curiosidades 
                    where tbl_curiosidades.id=${idCuriosidade}`;

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

const deleteCuriosidadesByIdParticipacao = async function (idParticipacao) {
    try {
        let sql = criarSql.DELETE('tbl_participacao_curiosidade', 'id_participacao', idParticipacao);

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
    insertParticipacaoCuriosidade,
    updateParticipacaoCuriosidade,
    selectAllParticipacaoCuriosidades,
    selectByIdParticipacaoCuriosidade,
    deleteParticipacaoCuriosidade,
    selectCuriosidadesByIdParticipacao,
    selectParticipacoesByIdCuriosidade,
    deleteCuriosidadesByIdParticipacao
};