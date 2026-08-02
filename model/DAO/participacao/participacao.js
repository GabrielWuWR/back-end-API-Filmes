
const knex = require('knex');
const knexDatabaseConfig = require('../../database_config/knexConfig.js');
const knexConection = knex(knexDatabaseConfig.development);

const { criarSql } = require('../../../utils/criadorSql.js');

const camposEspeciais = {
    salario: { vazioNull: true }
};

const insertParticipacao = async function (participacao) {
    try {
        let sql = criarSql.INSERT('tbl_participacao', participacao, camposEspeciais);

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

const updateParticipacao = async function (participacao) {
    try {
        let sql = criarSql.UPDATE('tbl_participacao', participacao, camposEspeciais);

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

const selectAllParticipacoes = async function () {
    try {
        let sql = criarSql.SELECT('tbl_participacao');

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

const selectByIdParticipacao = async function (id) {
    try {
        let sql = criarSql.SELECT('tbl_participacao', 'id', id);

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

const deleteParticipacao = async function (id) {
    try {
        let sql = criarSql.DELETE('tbl_participacao', 'id', id);

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

const selectParticipacoesByIdFilme = async function (idFilme) {
    try {
        let sql = ` select tbl_pessoa.*, tbl_participacao.salario, tbl_participacao.id as id_participacao
                    from tbl_pessoa
                        inner join tbl_participacao
                            on tbl_pessoa.id = tbl_participacao.id_pessoa
                        inner join tbl_filmes
                            on tbl_filmes.id = tbl_participacao.id_filme 
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

const selectParticipacoesByIdPessoa = async function (idPessoa) {
    try {
        let sql = ` select tbl_filmes.*, tbl_participacao.salario, tbl_participacao.id as id_participacao
                    from tbl_filmes
                        inner join tbl_participacao
                            on tbl_filmes.id = tbl_participacao.id_filme
                        inner join tbl_pessoa
                            on tbl_pessoa.id = tbl_participacao.id_pessoa 
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

const deleteParticipacoesByIdFilme = async function (idFilme) {
    try {
        let sql = criarSql.DELETE('tbl_participacao', 'id_filme', idFilme);

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

const selectElencoByIdFilme = async function (idFilme) {
    try {
        let sql = `
            select 
                tbl_participacao.id as id_participacao,
                tbl_participacao.salario,
                tbl_pessoa.id as id_pessoa,
                tbl_pessoa.nome_nascimento as nome_ator,
                tbl_ator.id as id_ator,
                tbl_ator.ordem_credito,
                tbl_tipo_atuacao.tipo as tipo_atuacao,
                tbl_personagem.id as id_personagem,
                tbl_personagem.nome as nome_personagem,
                tbl_personagem.descricao as descricao_personagem,
                tbl_curiosidades.id as id_curiosidade, 
                tbl_curiosidades.curiosidade as texto_curiosidade
            from tbl_participacao
                inner join tbl_pessoa on tbl_participacao.id_pessoa = tbl_pessoa.id
                inner join tbl_ator on tbl_ator.id_participacao = tbl_participacao.id
                inner join tbl_tipo_atuacao on tbl_ator.id_tipo_atuacao = tbl_tipo_atuacao.id
                left join tbl_ator_personagem on tbl_ator_personagem.id_ator = tbl_ator.id
                left join tbl_personagem on tbl_ator_personagem.id_personagem = tbl_personagem.id
                left join tbl_participacao_curiosidade on tbl_participacao.id = tbl_participacao_curiosidade.id_participacao
                left join tbl_curiosidades on tbl_participacao_curiosidade.id_curiosidades = tbl_curiosidades.id
            where tbl_participacao.id_filme = ${idFilme};
        `;

        let result = await knexConection.raw(sql);

        if (result) {
            return result[0];
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

const deleteParticipacoesByIdPessoa = async function (idPessoa) {
    try {
        let sql = criarSql.DELETE('tbl_participacao', 'id_pessoa', idPessoa);

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
    insertParticipacao,
    updateParticipacao,
    selectAllParticipacoes,
    selectByIdParticipacao,
    deleteParticipacao,
    selectParticipacoesByIdFilme,
    selectParticipacoesByIdPessoa,
    deleteParticipacoesByIdFilme,
    deleteParticipacoesByIdPessoa,
    selectElencoByIdFilme
};