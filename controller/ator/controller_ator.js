
const { mensagem } = require('../modulo/configMessages.js');
const atorDAO = require('../../model/DAO/ator/ator.js');

const controllerTipoAtuacao = require('../tipo_atuacao/controller_tipo_atuacao.js');
const controllerAtorPersonagem = require('./controller_ator_personagem.js');
const controllerAtorIdiomas = require('./controller_ator_idiomas.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    ordem_credito: { necessario: false, tipo: "number" },
    id_tipo_atuacao: { necessario: true, tipo: "number" },
    id_participacao: { necessario: true, tipo: "number" }
};

const inserirNovoAtor = async function (ator, contentType) {

    try {
        let resultValidar = validar.DADOS(ator, regras, contentType);

        if (resultValidar == false) {
            let dadosAtor = tratar.DADOS(ator, [
                "ordem_credito",
                "id_tipo_atuacao",
                "id_participacao"
            ]);

            let result = await atorDAO.insertAtor(dadosAtor);

            if (result) {
                ator.id = result;
                let erroRelacionamento = false;

                if (ator.personagens && ator.personagens.length > 0) {
                    for (let itemPersonagem of ator.personagens) {
                        let atorPersonagem = {
                            "id_ator": ator.id,
                            "id_personagem": itemPersonagem.id_personagem
                        };
                        let resultPersonagem = await controllerAtorPersonagem.inserirNovoAtorPersonagem(atorPersonagem, contentType);

                        if (resultPersonagem.status == false) {
                            erroRelacionamento = true;
                        }
                    }
                }

                if (ator.idiomas && ator.idiomas.length > 0) {
                    for (let itemIdioma of ator.idiomas) {
                        let atorIdioma = {
                            "id_ator": ator.id,
                            "id_idiomas": itemIdioma.id
                        };
                        let resultIdioma = await controllerAtorIdiomas.inserirNovoAtorIdiomas(atorIdioma, contentType);

                        if (resultIdioma.status == false) {
                            erroRelacionamento = true;
                        }
                    }
                }

                if (erroRelacionamento == true) {
                    return mensagem.SUCESSO_CRIAR_ITEM_AVISO(ator);
                } else {
                    return mensagem.SUCESSO_CRIAR_ITEM(ator);
                }
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

const atualizarAtor = async function (ator, id, contentType) {

    try {
        let resultValidar = validar.DADOS(ator, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarAtor(id);

            if (resultBuscar.status == true) {
                ator.id = Number(id);

                let dadosAtor = tratar.DADOS(ator, [
                    "id",
                    "ordem_credito",
                    "id_tipo_atuacao",
                    "id_participacao"
                ]);

                let result = await atorDAO.updateAtor(dadosAtor);

                if (result) {
                    let erroRelacionamento = false;

                    if (ator.personagens !== undefined) {
                        let resultDeletePersonagens = await controllerAtorPersonagem.deletarPersonagensIdAtor(ator.id);

                        if (resultDeletePersonagens.status == true) {
                            if (ator.personagens.length > 0) {
                                for (let itemPersonagem of ator.personagens) {
                                    let atorPersonagem = {
                                        "id_ator": ator.id,
                                        "id_personagem": itemPersonagem.id_personagem
                                    };
                                    let res = await controllerAtorPersonagem.inserirNovoAtorPersonagem(atorPersonagem, contentType);

                                    if (res.status == false) {
                                        erroRelacionamento = true;
                                    }
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (ator.idiomas !== undefined) {
                        let resultDeleteIdiomas = await controllerAtorIdiomas.deletarIdiomasIdAtor(ator.id);

                        if (resultDeleteIdiomas.status == true) {
                            if (ator.idiomas.length > 0) {
                                for (let itemIdioma of ator.idiomas) {
                                    let atorIdioma = {
                                        "id_ator": ator.id,
                                        "id_idiomas": itemIdioma.id
                                    };
                                    let res = await controllerAtorIdiomas.inserirNovoAtorIdiomas(atorIdioma, contentType);

                                    if (res.status == false) {
                                        erroRelacionamento = true;
                                    }
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (erroRelacionamento == true) {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM_AVISO(ator);
                    } else {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM(ator);
                    }

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

const listarTodosAtores = async function () {

    try {
        let result = await atorDAO.selectAllAtores();

        if (result) {
            if (result.length > 0) {

                for (let ator of result) {
                    let resultTipo = await controllerTipoAtuacao.buscarTipoAtuacao(ator.id_tipo_atuacao);

                    if (resultTipo.status == true) {
                        ator.tipo_atuacao = resultTipo.response.tipo_atuacao;
                        delete ator.id_tipo_atuacao;
                    }

                    let resultPersonagens = await controllerAtorPersonagem.buscarPersonagensIdAtor(ator.id);
                    if (resultPersonagens.status == true) {
                        ator.personagens = resultPersonagens.response.personagens;
                    }

                    let resultIdiomas = await controllerAtorIdiomas.buscarIdiomasIdAtor(ator.id);
                    if (resultIdiomas.status == true) {
                        ator.idiomas = resultIdiomas.response.idiomas;
                    }
                }

                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "atores");
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

const buscarAtor = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await atorDAO.selectByIdAtor(id);

            if (result) {
                if (result.length > 0) {

                    for (let ator of result) {
                        let resultTipo = await controllerTipoAtuacao.buscarTipoAtuacao(ator.id_tipo_atuacao);

                        if (resultTipo.status == true) {
                            ator.tipo_atuacao = resultTipo.response.tipo_atuacao;
                            delete ator.id_tipo_atuacao;
                        }

                        let resultPersonagens = await controllerAtorPersonagem.buscarPersonagensIdAtor(ator.id);
                        if (resultPersonagens.status == true) {
                            ator.personagens = resultPersonagens.response.personagens;
                        }

                        let resultIdiomas = await controllerAtorIdiomas.buscarIdiomasIdAtor(ator.id);
                        if (resultIdiomas.status == true) {
                            ator.idiomas = resultIdiomas.response.idiomas;
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ator");
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

const deletarAtor = async function (id) {

    try {
        let resultBuscar = await buscarAtor(id);

        if (resultBuscar.status == true) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await atorDAO.deleteAtor(id);

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

const buscarAtoresIdParticipacao = async function (idParticipacao) {
    try {
        let resultValidarId = validar.ID(idParticipacao);

        if (resultValidarId == false) {
            let result = await atorDAO.selectAtoresByIdParticipacao(idParticipacao);

            if (result) {
                if (result.length > 0) {

                    for (let ator of result) {
                        let resultTipo = await controllerTipoAtuacao.buscarTipoAtuacao(ator.id_tipo_atuacao);

                        if (resultTipo.status == true) {
                            ator.tipo_atuacao = resultTipo.response.tipo_atuacao;
                            delete ator.id_tipo_atuacao;
                        }

                        let resultPersonagens = await controllerAtorPersonagem.buscarPersonagensIdAtor(ator.id);
                        if (resultPersonagens.status == true) {
                            ator.personagens = resultPersonagens.response.personagens;
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "atores");
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

const deletarAtoresIdParticipacao = async function (idParticipacao) {
    try {
        let resultValidarId = validar.ID(idParticipacao);

        if (resultValidarId == false) {
            let result = await atorDAO.deleteAtoresByIdParticipacao(idParticipacao);

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
    inserirNovoAtor,
    atualizarAtor,
    listarTodosAtores,
    buscarAtor,
    deletarAtor,
    buscarAtoresIdParticipacao,
    deletarAtoresIdParticipacao
};