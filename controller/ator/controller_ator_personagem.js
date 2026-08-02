
const { mensagem } = require('../modulo/configMessages.js');
const atorPersonagemDAO = require('../../model/DAO/ator_personagem/ator_personagem.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_ator: { necessario: true, tipo: "number" },
    id_personagem: { necessario: true, tipo: "number" }
};

const inserirNovoAtorPersonagem = async function (atorPersonagem, contentType) {

    try {
        let resultValidar = validar.DADOS(atorPersonagem, regras, contentType);

        if (resultValidar == false) {
            let result = await atorPersonagemDAO.insertAtorPersonagem(tratar.DADOS(atorPersonagem));

            if (result) {
                atorPersonagem.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(atorPersonagem);
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

const atualizarAtorPersonagem = async function (atorPersonagem, id, contentType) {

    try {
        let resultValidar = validar.DADOS(atorPersonagem, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarAtorPersonagem(id);

            if (resultBuscar.status == true) {
                atorPersonagem.id = Number(id);

                let result = await atorPersonagemDAO.updateAtorPersonagem(tratar.DADOS(atorPersonagem));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(atorPersonagem);
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

const listarTodosAtorPersonagens = async function () {

    try {
        let result = await atorPersonagemDAO.selectAllAtorPersonagens();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ator_personagens");
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

const buscarAtorPersonagem = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await atorPersonagemDAO.selectByIdAtorPersonagem(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ator_personagem");
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

const deletarAtorPersonagem = async function (id) {

    try {
        let resultBuscar = await buscarAtorPersonagem(id);

        if (resultBuscar.status == true) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await atorPersonagemDAO.deleteAtorPersonagem(id);

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

const buscarPersonagensIdAtor = async function (idAtor) {
    try {
        let resultValidarId = validar.ID(idAtor);

        if (resultValidarId == false) {
            let result = await atorPersonagemDAO.selectPersonagensByIdAtor(idAtor);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "personagens");
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

const deletarPersonagensIdAtor = async function (idAtor) {
    try {
        let resultValidarId = validar.ID(idAtor);

        if (resultValidarId == false) {
            let result = await atorPersonagemDAO.deletePersonagensByIdAtor(idAtor);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
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

module.exports = {
    inserirNovoAtorPersonagem,
    atualizarAtorPersonagem,
    listarTodosAtorPersonagens,
    buscarAtorPersonagem,
    deletarAtorPersonagem,
    buscarPersonagensIdAtor,
    deletarPersonagensIdAtor
};