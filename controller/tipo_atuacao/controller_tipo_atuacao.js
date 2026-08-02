
const { mensagem } = require('../modulo/configMessages.js');
const tipoAtuacaoDAO = require('../../model/DAO/tipo_atuacao/tipo_atuacao.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    tipo: { necessario: true, minimo: 1, maximo: 55, tipo: "string" },
    descricao: { necessario: false, tipo: "string" }
};

const inserirNovoTipoAtuacao = async function (tipoAtuacao, contentType) {

    try {
        let resultValidar = validar.DADOS(tipoAtuacao, regras, contentType);

        if (resultValidar == false) {
            let result = await tipoAtuacaoDAO.insertTipoAtuacao(tratar.DADOS(tipoAtuacao));

            if (result) {
                tipoAtuacao.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(tipoAtuacao);
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const atualizarTipoAtuacao = async function (tipoAtuacao, id, contentType) {

    try {
        let resultValidar = validar.DADOS(tipoAtuacao, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarTipoAtuacao(id);

            if (resultBuscar.status == true) {
                tipoAtuacao.id = Number(id);

                let result = await tipoAtuacaoDAO.updateTipoAtuacao(tratar.DADOS(tipoAtuacao));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(tipoAtuacao);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscar;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosTiposAtuacao = async function () {

    try {
        let result = await tipoAtuacaoDAO.selectAllTiposAtuacao();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "tipos_atuacao");
            } else {
                return mensagem.ERRO_NADA_ENCONTRADO();
            }
        } else {
            return mensagem.ERRO_MODEL();
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarTipoAtuacao = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await tipoAtuacaoDAO.selectByIdTipoAtuacao(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "tipo_atuacao");
                } else {
                    return mensagem.ERRO_NADA_ENCONTRADO();
                }
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultValidarId;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const deletarTipoAtuacao = async function (id) {

    try {
        let resultBuscar = await buscarTipoAtuacao(id);

        if (resultBuscar.status == true) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await tipoAtuacaoDAO.deleteTipoAtuacao(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovoTipoAtuacao,
    atualizarTipoAtuacao,
    listarTodosTiposAtuacao,
    buscarTipoAtuacao,
    deletarTipoAtuacao
};