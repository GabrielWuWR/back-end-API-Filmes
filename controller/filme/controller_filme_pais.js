
const { mensagem } = require('../modulo/configMessages.js');
const filmePaisDAO = require('../../model/DAO/filme_pais/filme_pais.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_pais: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" },
    origem: { necessario: true, tipo: "number" }
};

const inserirNovoFilmePais = async function (filmePais, contentType) {

    try {
        let resultValidar = validar.DADOS(filmePais, regras, contentType);

        if (resultValidar == false) {
            let result = await filmePaisDAO.insertFilmePais(tratar.DADOS(filmePais));

            if (result) {
                filmePais.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(filmePais);
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

const atualizarFilmePais = async function (filmePais, id, contentType) {

    try {
        let resultValidar = validar.DADOS(filmePais, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFilmePais = await buscarFilmePais(id);

            if (resultBuscarFilmePais.status == true) {
                filmePais.id = Number(id);

                let result = await filmePaisDAO.updateFilmePais(tratar.DADOS(filmePais));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(filmePais);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFilmePais;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosFilmePais = async function () {

    try {
        let result = await filmePaisDAO.selectAllFilmePais();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_pais");
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

const buscarFilmePais = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await filmePaisDAO.selectByIdFilmePais(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_pais");
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

const deletarFilmePais = async function (id) {

    try {
        let resultBuscarFilmePais = await buscarFilmePais(id);

        if (resultBuscarFilmePais.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await filmePaisDAO.deleteFilmePais(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFilmePais;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarPaisesIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmePaisDAO.selectPaisesByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "paises");
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

const buscarFilmesIdPais = async function (idPais) {
    try {
        let resultValidarId = validar.ID(idPais);

        if (resultValidarId == false) {
            let result = await filmePaisDAO.selectFilmesByIdPais(idPais);

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

const deletarPaisesIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmePaisDAO.deletePaisesByIdFilme(idFilme);

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
    inserirNovoFilmePais,
    atualizarFilmePais,
    listarTodosFilmePais,
    buscarFilmePais,
    deletarFilmePais,
    buscarPaisesIdFilme,
    buscarFilmesIdPais,
    deletarPaisesIdFilme
};