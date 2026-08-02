
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const insertPessoaPremio = async function (pessoaPremio) {
    try {
        let sql = criarSql.INSERT('tbl_pessoa_premio', pessoaPremio);

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

const updatePessoaPremio = async function (pessoaPremio) {
    try {
        let sql = criarSql.UPDATE('tbl_pessoa_premio', pessoaPremio);

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

const selectAllPessoaPremios = async function () {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_premio');

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

const selectByIdPessoaPremio = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_pessoa_premio', 'id', id);

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

const deletePessoaPremio = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_premio', 'id', id);

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

const selectPremiosByIdPessoa = async function (idPessoa) {
    try {
        let sql = ` select tbl_premio.*
                    from tbl_pessoa
                        inner join tbl_pessoa_premio
                            on tbl_pessoa.id = tbl_pessoa_premio.id_pessoa
                        inner join tbl_premio
                            on tbl_premio.id = tbl_pessoa_premio.id_premio 
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

const selectPessoasByIdPremio = async function (idPremio) {
    try {
        let sql = ` select tbl_pessoa.*
                    from tbl_pessoa
                        inner join tbl_pessoa_premio
                            on tbl_pessoa.id = tbl_pessoa_premio.id_pessoa
                        inner join tbl_premio
                            on tbl_premio.id = tbl_pessoa_premio.id_premio 
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

const deletePremiosByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.DELETE('tbl_pessoa_premio', 'id_pessoa', idPessoa);

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
    insertPessoaPremio,
    updatePessoaPremio,
    selectAllPessoaPremios,
    selectByIdPessoaPremio,
    deletePessoaPremio,
    selectPremiosByIdPessoa,
    selectPessoasByIdPremio,
    deletePremiosByIdPessoa
};