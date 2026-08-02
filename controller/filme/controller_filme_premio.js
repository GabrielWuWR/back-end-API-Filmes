
const { mensagem } = require('../modulo/configMessages.js');
const filmePremioDAO = require('../../model/DAO/filme_premio/filme_premio.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_premio: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" }
};

const inserirNovoFilmePremio = async function (filmePremio, contentType) {

    try {
        let resultValidar = validar.DADOS(filmePremio, regras, contentType);

        if (resultValidar == false) {
            let result = await filmePremioDAO.insertFilmePremio(tratar.DADOS(filmePremio));

            if (result) {
                filmePremio.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(filmePremio);
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

const atualizarFilmePremio = async function (filmePremio, id, contentType) {

    try {
        let resultValidar = validar.DADOS(filmePremio, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFilmePremio = await buscarFilmePremio(id);

            if (resultBuscarFilmePremio.status == true) {
                filmePremio.id = Number(id);

                let result = await filmePremioDAO.updateFilmePremio(tratar.DADOS(filmePremio));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(filmePremio);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFilmePremio;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosFilmePremio = async function () {

    try {
        let result = await filmePremioDAO.selectAllFilmePremio();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_premio");
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

const buscarFilmePremio = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await filmePremioDAO.selectByIdFilmePremio(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_premio");
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

const deletarFilmePremio = async function (id) {

    try {
        let resultBuscarFilmePremio = await buscarFilmePremio(id);

        if (resultBuscarFilmePremio.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await filmePremioDAO.deleteFilmePremio(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFilmePremio;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarPremiosIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmePremioDAO.selectPremiosByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "premios");
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

const buscarFilmesIdPremio = async function (idPremio) {
    try {
        let resultValidarId = validar.ID(idPremio);

        if (resultValidarId == false) {
            let result = await filmePremioDAO.selectFilmesByIdPremio(idPremio);

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

const deletarPremiosIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmePremioDAO.deletePremiosByIdFilme(idFilme);

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
    inserirNovoFilmePremio,
    atualizarFilmePremio,
    listarTodosFilmePremio,
    buscarFilmePremio,
    deletarFilmePremio,
    buscarPremiosIdFilme,
    buscarFilmesIdPremio,
    deletarPremiosIdFilme
};