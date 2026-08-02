
const { mensagem } = require('../modulo/configMessages.js');

const personagemDAO = require('../../model/DAO/personagem/personagem.js');

const controllerFotoPersonagem = require('../foto_personagem/controller_foto_personagem.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    nome: { necessario: true, minimo: 1, maximo: 100, tipo: "string" },
    descricao: { necessario: false, tipo: "string" }
};

const inserirNovoPersonagem = async function (personagem, contentType) {
    try {
        let resultValidar = validar.DADOS(personagem, regras, contentType);

        if (resultValidar == false) {
            let dadosPersonagem = tratar.DADOS(personagem, [
                "nome",
                "descricao"
            ]);

            let result = await personagemDAO.insertPersonagem(dadosPersonagem);

            if (result) {
                personagem.id = result;
                let erroRelacionamento = false;
                if (personagem.fotos && personagem.fotos.length > 0) {
                    for (let itemFoto of personagem.fotos) {
                        let fotoPersonagem = {
                            "foto": itemFoto.foto,
                            "id_personagem": personagem.id
                        };
                        let resultFoto = await controllerFotoPersonagem.inserirNovaFotoPersonagem(fotoPersonagem, contentType);

                        if (!resultFoto.status) {
                            erroRelacionamento = true;
                        }
                    }
                }

                if (erroRelacionamento) {
                    return mensagem.SUCESSO_CRIAR_ITEM_AVISO(personagem);
                } else {
                    return mensagem.SUCESSO_CRIAR_ITEM(personagem);
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

const atualizarPersonagem = async function (personagem, id, contentType) {
    try {
        let resultValidar = validar.DADOS(personagem, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarPersonagem = await buscarPersonagem(id);

            if (resultBuscarPersonagem.status == true) {
                personagem.id = Number(id);

                let dadosPersonagem = tratar.DADOS(personagem, [
                    "id",
                    "nome",
                    "descricao"
                ]);

                let result = await personagemDAO.updatePersonagem(dadosPersonagem);

                if (result) {
                    let erroRelacionamento = false;

                    if (personagem.fotos !== undefined) {
                        let resultDeleteFotos = await controllerFotoPersonagem.deletarFotosIdPersonagem(personagem.id);

                        if (resultDeleteFotos.status) {
                            if (personagem.fotos.length > 0) {
                                for (let itemFoto of personagem.fotos) {
                                    let fotoPersonagem = {
                                        "foto": itemFoto.foto,
                                        "id_personagem": personagem.id
                                    };
                                    let res = await controllerFotoPersonagem.inserirNovaFotoPersonagem(fotoPersonagem, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (erroRelacionamento) {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM_AVISO(personagem);
                    } else {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM(personagem);
                    }
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarPersonagem;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosPersonagens = async function () {
    try {
        let result = await personagemDAO.selectAllPersonagens();

        if (result) {
            if (result.length > 0) {
                for (let personagem of result) {
                    let resultFotos = await controllerFotoPersonagem.buscarFotosIdPersonagem(personagem.id);
                    if (resultFotos.status == true) {
                        for (let foto of resultFotos.response.fotos) {
                            delete foto.id_personagem;
                        }
                        personagem.fotos = resultFotos.response.fotos;
                    }
                }

                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "personagens");
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

const buscarPersonagem = async function (id) {
    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await personagemDAO.selectByIdPersonagem(id);

            if (result) {
                if (result.length > 0) {
                    for (let personagem of result) {
                        let resultFotos = await controllerFotoPersonagem.buscarFotosIdPersonagem(personagem.id);
                        if (resultFotos.status == true) {
                            for (let foto of resultFotos.response.fotos) {
                                delete foto.id_personagem;
                            }
                            personagem.fotos = resultFotos.response.fotos;
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "personagem");
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

const deletarPersonagem = async function (id) {
    try {
        let resultBuscarPersonagem = await buscarPersonagem(id);

        if (resultBuscarPersonagem.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await personagemDAO.deletePersonagem(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarPersonagem;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovoPersonagem,
    atualizarPersonagem,
    listarTodosPersonagens,
    buscarPersonagem,
    deletarPersonagem
};