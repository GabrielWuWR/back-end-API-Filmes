/*************************************************************************************************************
 * Objetivo: Criar as funções responsáveis pela geração dos comandos SQL
 * Autor: Gabriel
 * Versão: 1.0.0
 * Data: 30/05/26
 ************************************************************************************************************/

/**
 * Objeto com as funções geradoras dos comandos SQL para o banco de dados.
 */
const criarSql = {

    /**
     * Função responsável por montar um comando de INSERT.
     * @param {string} nomeTabela - O nome da tabela.
     * @param {Object} dados - O objeto com os dados que vamos criar.
     * @param {Object} [camposEspeciais={}] - (Opcional) objeto com os campos que precisam de algum tratamento diferente.
     * @returns {string} - Retorna a string contendo o comando de SQL pronto.
     */
    INSERT(nomeTabela, dados, camposEspeciais = {}) {
        let campos = [];  //Array que vai guardar a primeira parte do insert
        let valores = []; //Array que vai guardar os valores dos campos

        //Fazendo um loop nos dados enviados
        for (let campo in dados) { //Cada dado enviado recebe o nome de campo
            let valor = dados[campo]; //Pegando o valor daquele campo isso vai algo como let "valor = dados.nome" por exemplo

            campos.push(campo); //Adicionando o campo ao array de campos

            if (valor === null || valor === undefined) {
                valores.push('NULL');
            } else if (camposEspeciais[campo] && camposEspeciais[campo].vazioNull == true && valor === '') {
                valores.push('NULL');
            } else {
                valores.push(`'${valor}'`);
            }
        }

        //Montando a variavel sql
        //Usamos o join para adicionar um item por vez e uma , depois, os espaços são apenas para manter o
        //codigo identado
        let sql = `
            insert into ${nomeTabela} (
                ${campos.join(',\n                ')}
            ) values (
                ${valores.join(',\n                ')}
            );
        `;

        return sql;
    },

    /**
     * Função responsável por montar um comando de UPDATE.
     * * @param {string} nomeTabela - O nome da tabela que será atualizada.
     * @param {Object} dados - O objeto contendo os campos a serem atualizados.
     * @param {Object} [camposEspeciais={}] - (Opcional) objeto com os campos que precisam de algum tratamento diferente.
     * @returns {string} - Retorna a string contendo o comando de SQL pronto.
     */
    UPDATE(nomeTabela, dados, camposEspeciais = {}) {
        let linhas = [];

        for (let campo in dados) {
            if (campo == 'id') continue;

            let valor = dados[campo];
            let valorFormatado;

            if (valor === null || valor === undefined) {
                valorFormatado = 'NULL';
            } else if (camposEspeciais[campo] && camposEspeciais[campo].vazioNull === true && valor === '') {
                valorFormatado = 'NULL';
            } else {
                valorFormatado = `'${valor}'`;
            }

            linhas.push(`${campo} = ${valorFormatado}`);
        }

        let sql = `
        update ${nomeTabela} set 
                ${linhas.join(', \n            ')}
        where id = ${dados.id};
    `;

        return sql;
    },

    /**
     * Função responsável por montar um comando de SELECT.
     * Pode criar selects com ou sem where.
     * @param {string} nomeTabela - O nome da tabela que será consultada.
     * @param {string} nomeCampo - O nome da coluna usada como condição no where.
     * @param {number|string|null} [campo=null] - (Opcional) O valor a ser buscado. Caso seja null, gera um select sem where.
     * @returns {string} - Retorna o comando sql pronto.
     */
    SELECT(nomeTabela, nomeCampo, campo) {
        let sql = null;

        if (campo == null) {
            sql = `select * from ${nomeTabela} order by id desc;`
        } else {
            sql = `select * from ${nomeTabela} where ${nomeCampo} = '${campo}';`
        }

        return sql;
    },

    /**
     * Função responsável por montar um comando de DELETE.
     * @param {string} nomeTabela - O nome da tabela de onde o registro será apagado.
     * @param {string} campoNome - O nome da coluna usada como condição para a exclusão.
     * @param {number|string} campoValor - O valor da condição para a exclusão do registro.
     * @returns {string} - Retorna o comando sql pronto.
     */
    DELETE(nomeTabela, campoNome, campoValor) {
        let sql = `delete from ${nomeTabela} where ${campoNome} = ${campoValor};`;

        return sql;
    }
};

module.exports = {
    criarSql
};