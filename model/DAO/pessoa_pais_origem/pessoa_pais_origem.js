
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertPessoaPaisOrigem = async function (pessoaPais) {
    try {
        let sql = criarSql.INSERT('tbl_pessoa_pais_origem', pessoaPais);

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

const updatePessoaPaisOrigem = async function (pessoaPais) {
    try {
        let sql = criarSql.UPDATE('tbl_pessoa_pais_origem', pessoaPais);

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

const selectAllPessoaPaisOrigens = async function () {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_pais_origem');

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

const selectByIdPessoaPaisOrigem = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_pais_origem', 'id', id);

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

const deletePessoaPaisOrigem = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_pais_origem', 'id', id);

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

const selectPaisesByIdPessoa = async function (idPessoa) {
    try {
        let sql = ` select tbl_pais.*
                    from tbl_pessoa
                        inner join tbl_pessoa_pais_origem
                            on tbl_pessoa.id = tbl_pessoa_pais_origem.id_pessoa
                        inner join tbl_pais
                            on tbl_pais.id = tbl_pessoa_pais_origem.id_pais 
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

const selectPessoasByIdPais = async function (idPais) {
    try {
        let sql = ` select tbl_pessoa.*
                    from tbl_pessoa
                        inner join tbl_pessoa_pais_origem
                            on tbl_pessoa.id = tbl_pessoa_pais_origem.id_pessoa
                        inner join tbl_pais
                            on tbl_pais.id = tbl_pessoa_pais_origem.id_pais 
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

const deletePaisesByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_pais_origem', 'id_pessoa', idPessoa);

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
    insertPessoaPaisOrigem,
    updatePessoaPaisOrigem,
    selectAllPessoaPaisOrigens,
    selectByIdPessoaPaisOrigem,
    deletePessoaPaisOrigem,
    selectPaisesByIdPessoa,
    selectPessoasByIdPais,
    deletePaisesByIdPessoa
};