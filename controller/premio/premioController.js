
const { mensagem } = require('../modulo/configMessages.js');
const premioDAO = require('../../model/DAO/premio/premio.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    nome: { necessario: true, minimo: 1, maximo: 30, tipo: "string" },
    data_ganho: { necessario: true, minimo: 10, maximo: 10, tipo: "data" },
    descricao: { necessario: false, tipo: "string" },
    curiosidades: { necessario: false, tipo: "string" }
};

const inserirNovoPremio = async function (premio, contentType) {

    try {
        let resultValidar = validar.DADOS(premio, regras, contentType);

        if (resultValidar == false) {
            let result = await premioDAO.insertPremio(tratar.DADOS(premio));

            if (result) {
                premio.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(premio);
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

const atualizarPremio = async function (premio, id, contentType) {

    try {
        let resultValidar = validar.DADOS(premio, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarPremio = await buscarPremio(id);

            if (resultBuscarPremio.status == true) {
                premio.id = Number(id);

                let result = await premioDAO.updatePremio(tratar.DADOS(premio));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(premio);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarPremio;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosPremios = async function () {

    try {
        let result = await premioDAO.selectAllPremio();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "premio");
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

const buscarPremio = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await premioDAO.selectByIdPremio(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "premio");
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

const deletarPremio = async function (id) {

    try {
        let resultBuscarPremio = await buscarPremio(id);

        if (resultBuscarPremio.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await premioDAO.deletePremio(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarPremio;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovoPremio,
    atualizarPremio,
    listarTodosPremios,
    buscarPremio,
    deletarPremio
};