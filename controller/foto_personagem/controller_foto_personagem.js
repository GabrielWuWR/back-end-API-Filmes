
const { mensagem } = require('../modulo/configMessages.js');
const fotoPersonagemDAO = require('../../model/DAO/foto_personagem/foto_personagem.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    foto: { necessario: true, minimo: 1, maximo: 256, tipo: "string" },
    id_personagem: { necessario: true, tipo: "number" }
};

const inserirNovaFotoPersonagem = async function (fotoPersonagem, contentType) {

    try {
        let resultValidar = validar.DADOS(fotoPersonagem, regras, contentType);

        if (resultValidar == false) {
            let result = await fotoPersonagemDAO.insertFotoPersonagem(tratar.DADOS(fotoPersonagem));

            if (result) {
                fotoPersonagem.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(fotoPersonagem);
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

const atualizarFotoPersonagem = async function (fotoPersonagem, id, contentType) {

    try {
        let resultValidar = validar.DADOS(fotoPersonagem, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFotoPersonagem = await buscarFotoPersonagem(id);

            if (resultBuscarFotoPersonagem.status == true) {
                fotoPersonagem.id = Number(id);

                let result = await fotoPersonagemDAO.updateFotoPersonagem(tratar.DADOS(fotoPersonagem));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(fotoPersonagem);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFotoPersonagem;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodasFotosPersonagem = async function () {

    try {
        let result = await fotoPersonagemDAO.selectAllFotoPersonagem();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "fotos_personagem");
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

const buscarFotoPersonagem = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await fotoPersonagemDAO.selectByIdFotoPersonagem(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "foto_personagem");
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

const deletarFotoPersonagem = async function (id) {

    try {
        let resultBuscarFotoPersonagem = await buscarFotoPersonagem(id);

        if (resultBuscarFotoPersonagem.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await fotoPersonagemDAO.deleteFotoPersonagem(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFotoPersonagem;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarFotosIdPersonagem = async function (idPersonagem) {
    try {
        let resultValidarId = validar.ID(idPersonagem);

        if (resultValidarId == false) {
            let result = await fotoPersonagemDAO.selectFotosByIdPersonagem(idPersonagem);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "fotos");
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

const deletarFotosIdPersonagem = async function (idPersonagem) {
    try {
        let resultValidarId = validar.ID(idPersonagem);

        if (resultValidarId == false) {
            let result = await fotoPersonagemDAO.deleteFotosByIdPersonagem(idPersonagem);

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
    inserirNovaFotoPersonagem,
    atualizarFotoPersonagem,
    listarTodasFotosPersonagem,
    buscarFotoPersonagem,
    deletarFotoPersonagem,
    buscarFotosIdPersonagem,
    deletarFotosIdPersonagem
};