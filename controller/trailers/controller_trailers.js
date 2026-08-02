
const { mensagem } = require('../modulo/configMessages.js');
const trailersDAO = require('../../model/DAO/trailers/trailers.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    trailer: { necessario: true, minimo: 1, maximo: 256, tipo: "string" },
    id_filme: { necessario: true, tipo: "number" }
};

const inserirNovoTrailer = async function (dadosTrailer, contentType) {

    try {
        let resultValidar = validar.DADOS(dadosTrailer, regras, contentType);

        if (resultValidar == false) {
            let result = await trailersDAO.insertTrailer(tratar.DADOS(dadosTrailer));

            if (result) {
                dadosTrailer.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(dadosTrailer);
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

const atualizarTrailer = async function (dadosTrailer, id, contentType) {

    try {
        let resultValidar = validar.DADOS(dadosTrailer, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarTrailer = await buscarTrailer(id);

            if (resultBuscarTrailer.status == true) {
                dadosTrailer.id = Number(id);

                let result = await trailersDAO.updateTrailer(tratar.DADOS(dadosTrailer));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(dadosTrailer);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarTrailer;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosTrailers = async function () {

    try {
        let result = await trailersDAO.selectAllTrailers();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "trailers");
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

const buscarTrailer = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await trailersDAO.selectByIdTrailer(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "trailer");
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

const deletarTrailer = async function (id) {

    try {
        let resultBuscarTrailer = await buscarTrailer(id);

        if (resultBuscarTrailer.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await trailersDAO.deleteTrailer(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarTrailer;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarTrailersIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await trailersDAO.selectTrailersByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "trailers");
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

const deletarTrailersIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await trailersDAO.deleteTrailersByIdFilme(idFilme);

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
    inserirNovoTrailer,
    atualizarTrailer,
    listarTodosTrailers,
    buscarTrailer,
    deletarTrailer,
    buscarTrailersIdFilme,
    deletarTrailersIdFilme
};