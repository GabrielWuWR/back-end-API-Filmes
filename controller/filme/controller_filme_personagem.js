
const { mensagem } = require('../modulo/configMessages.js');
const filmePersonagemDAO = require('../../model/DAO/filme_personagem/filme_personagem.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_personagem: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" }
};

const inserirNovoFilmePersonagem = async function (filmePersonagem, contentType) {

    try {
        let resultValidar = validar.DADOS(filmePersonagem, regras, contentType);

        if (resultValidar == false) {
            let result = await filmePersonagemDAO.insertFilmePersonagem(tratar.DADOS(filmePersonagem));

            if (result) {
                filmePersonagem.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(filmePersonagem);
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

const atualizarFilmePersonagem = async function (filmePersonagem, id, contentType) {

    try {
        let resultValidar = validar.DADOS(filmePersonagem, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFilmePersonagem = await buscarFilmePersonagem(id);

            if (resultBuscarFilmePersonagem.status == true) {
                filmePersonagem.id = Number(id);

                let result = await filmePersonagemDAO.updateFilmePersonagem(tratar.DADOS(filmePersonagem));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(filmePersonagem);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFilmePersonagem;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosFilmePersonagem = async function () {

    try {
        let result = await filmePersonagemDAO.selectAllFilmePersonagem();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_personagem");
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

const buscarFilmePersonagem = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await filmePersonagemDAO.selectByIdFilmePersonagem(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_personagem");
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

const deletarFilmePersonagem = async function (id) {

    try {
        let resultBuscarFilmePersonagem = await buscarFilmePersonagem(id);

        if (resultBuscarFilmePersonagem.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await filmePersonagemDAO.deleteFilmePersonagem(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFilmePersonagem;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarPersonagensIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmePersonagemDAO.selectPersonagensByIdFilme(idFilme);

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

const buscarFilmesIdPersonagem = async function (idPersonagem) {
    try {
        let resultValidarId = validar.ID(idPersonagem);

        if (resultValidarId == false) {
            let result = await filmePersonagemDAO.selectFilmesByIdPersonagem(idPersonagem);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filmes");
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

const deletarPersonagensIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmePersonagemDAO.deletePersonagensByIdFilme(idFilme);

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
    inserirNovoFilmePersonagem,
    atualizarFilmePersonagem,
    listarTodosFilmePersonagem,
    buscarFilmePersonagem,
    deletarFilmePersonagem,
    buscarPersonagensIdFilme,
    buscarFilmesIdPersonagem,
    deletarPersonagensIdFilme
};