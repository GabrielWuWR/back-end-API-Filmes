
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertPessoaCuriosidade = async function (pessoaCuriosidade) {
    try {
        let sql = criarSql.INSERT('tbl_pessoa_curiosidades', pessoaCuriosidade);

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

const updatePessoaCuriosidade = async function (pessoaCuriosidade) {
    try {
        let sql = criarSql.UPDATE('tbl_pessoa_curiosidades', pessoaCuriosidade);

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

const selectAllPessoaCuriosidades = async function () {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_curiosidades');

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

const selectByIdPessoaCuriosidade = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_curiosidades', 'id', id);

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

const deletePessoaCuriosidade = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_curiosidades', 'id', id);

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

const selectCuriosidadesByIdPessoa = async function (idPessoa) {
    try {
        let sql = ` select tbl_curiosidades.*
                    from tbl_pessoa
                        inner join tbl_pessoa_curiosidades
                            on tbl_pessoa.id = tbl_pessoa_curiosidades.id_pessoa
                        inner join tbl_curiosidades
                            on tbl_curiosidades.id = tbl_pessoa_curiosidades.id_curiosidades 
                    where tbl_pessoa.id=${idPessoa}`;

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

const selectPessoasByIdCuriosidade = async function (idCuriosidade) {
    try {
        let sql = ` select tbl_pessoa.*
                    from tbl_pessoa
                        inner join tbl_pessoa_curiosidades
                            on tbl_pessoa.id = tbl_pessoa_curiosidades.id_pessoa
                        inner join tbl_curiosidades
                            on tbl_curiosidades.id = tbl_pessoa_curiosidades.id_curiosidades 
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

const deleteCuriosidadesByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_curiosidades', 'id_pessoa', idPessoa);

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
    insertPessoaCuriosidade,
    updatePessoaCuriosidade,
    selectAllPessoaCuriosidades,
    selectByIdPessoaCuriosidade,
    deletePessoaCuriosidade,
    selectCuriosidadesByIdPessoa,
    selectPessoasByIdCuriosidade,
    deleteCuriosidadesByIdPessoa
};