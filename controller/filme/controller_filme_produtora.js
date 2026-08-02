
const { mensagem } = require('../modulo/configMessages.js');
const filmeProdutoraDAO = require('../../model/DAO/filmeProdutora/filmeProdutora.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_produtora: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" }
};

const inserirNovoFilmeProdutora = async function (filmeProdutora, contentType) {

    try {
        let resultValidar = validar.DADOS(filmeProdutora, regras, contentType);

        if (resultValidar == false) {
            let result = await filmeProdutoraDAO.insertFilmeProdutora(tratar.DADOS(filmeProdutora));

            if (result) {
                filmeProdutora.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(filmeProdutora);
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

const atualizarFilmeProdutora = async function (filmeProdutora, id, contentType) {

    try {
        let resultValidar = validar.DADOS(filmeProdutora, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFilmeProdutora = await buscarFilmeProdutora(id);

            if (resultBuscarFilmeProdutora.status == true) {
                filmeProdutora.id = Number(id);

                let result = await filmeProdutoraDAO.updateFilmeProdutora(tratar.DADOS(filmeProdutora));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(filmeProdutora);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFilmeProdutora;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosFilmeProdutora = async function () {

    try {
        let result = await filmeProdutoraDAO.selectAllFilmeProdutora();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_produtora");
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

const buscarFilmeProdutora = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await filmeProdutoraDAO.selectByIdFilmeProdutora(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_produtora");
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

const deletarFilmeProdutora = async function (id) {

    try {
        let resultBuscarFilmeProdutora = await buscarFilmeProdutora(id);

        if (resultBuscarFilmeProdutora.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await filmeProdutoraDAO.deleteFilmeProdutora(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFilmeProdutora;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarProdutorasIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmeProdutoraDAO.selectProdutorasByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "produtoras");
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

const buscarFilmesIdProdutora = async function (idProdutora) {
    try {
        let resultValidarId = validar.ID(idProdutora);

        if (resultValidarId == false) {
            let result = await filmeProdutoraDAO.selectFilmesByIdProdutora(idProdutora);

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

const deletarProdutorasIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmeProdutoraDAO.deleteProdutorasByIdFilme(idFilme);

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
    inserirNovoFilmeProdutora,
    atualizarFilmeProdutora,
    listarTodosFilmeProdutora,
    buscarFilmeProdutora,
    deletarFilmeProdutora,
    buscarProdutorasIdFilme,
    buscarFilmesIdProdutora,
    deletarProdutorasIdFilme
};