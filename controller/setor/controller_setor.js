
const { mensagem } = require('../modulo/configMessages.js');
const setorDAO = require('../../model/DAO/setor/setor.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    nome_setor: { necessario: true, minimo: 1, maximo: 50, tipo: "string" }
};

const inserirNovoSetor = async function (setor, contentType) {

    try {
        let resultValidar = validar.DADOS(setor, regras, contentType);

        if (resultValidar == false) {
            let result = await setorDAO.insertSetor(tratar.DADOS(setor));

            if (result) {
                setor.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(setor);
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

const atualizarSetor = async function (setor, id, contentType) {

    try {
        let resultValidar = validar.DADOS(setor, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarSetor = await buscarSetor(id);

            if (resultBuscarSetor.status == true) {
                setor.id = Number(id);

                let result = await setorDAO.updateSetor(tratar.DADOS(setor));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(setor);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarSetor;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosSetores = async function () {

    try {
        let result = await setorDAO.selectAllSetores();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "setores");
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

const buscarSetor = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await setorDAO.selectByIdSetor(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "setor");
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

const deletarSetor = async function (id) {

    try {
        let resultBuscarSetor = await buscarSetor(id);

        if (resultBuscarSetor.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await setorDAO.deleteSetor(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarSetor;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovoSetor,
    atualizarSetor,
    listarTodosSetores,
    buscarSetor,
    deletarSetor
};