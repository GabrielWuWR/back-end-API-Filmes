
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertPessoaOcupacao = async function (pessoaOcupacao) {
    try {
        let sql = criarSql.INSERT('tbl_pessoa_ocupacao', pessoaOcupacao);

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

const updatePessoaOcupacao = async function (pessoaOcupacao) {
    try {
        let sql = criarSql.UPDATE('tbl_pessoa_ocupacao', pessoaOcupacao);

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

const selectAllPessoaOcupacoes = async function () {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_ocupacao');

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

const selectByIdPessoaOcupacao = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_ocupacao', 'id', id);

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

const deletePessoaOcupacao = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_ocupacao', 'id', id);

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

const selectOcupacoesByIdPessoa = async function (idPessoa) {
    try {
        let sql = ` select tbl_ocupacoes.*
                    from tbl_pessoa
                        inner join tbl_pessoa_ocupacao
                            on tbl_pessoa.id = tbl_pessoa_ocupacao.id_pessoa
                        inner join tbl_ocupacoes
                            on tbl_ocupacoes.id = tbl_pessoa_ocupacao.id_ocupacoes 
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

const selectPessoasByIdOcupacao = async function (idOcupacao) {
    try {
        let sql = ` select tbl_pessoa.*
                    from tbl_pessoa
                        inner join tbl_pessoa_ocupacao
                            on tbl_pessoa.id = tbl_pessoa_ocupacao.id_pessoa
                        inner join tbl_ocupacoes
                            on tbl_ocupacoes.id = tbl_pessoa_ocupacao.id_ocupacoes 
                    where tbl_ocupacoes.id=${idOcupacao}`;

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

const deleteOcupacoesByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_ocupacao', 'id_pessoa', idPessoa);

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
    insertPessoaOcupacao,
    updatePessoaOcupacao,
    selectAllPessoaOcupacoes,
    selectByIdPessoaOcupacao,
    deletePessoaOcupacao,
    selectOcupacoesByIdPessoa,
    selectPessoasByIdOcupacao,
    deleteOcupacoesByIdPessoa
};