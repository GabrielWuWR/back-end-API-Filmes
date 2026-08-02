const { mensagem } = require('../modulo/configMessages.js');
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_genero: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" }
};

const inserirNovoFilmeGenero = async function (filmeGenero, contentType) {

    try {
        let resultValidar = validar.DADOS(filmeGenero, regras, contentType);

        if (resultValidar == false) {
            let result = await filmeGeneroDAO.insertFilmeGenero(tratar.DADOS(filmeGenero));

            if (result) {
                filmeGenero.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(filmeGenero);
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

const atualizarFilmeGenero = async function (filmeGenero, id, contentType) {

    try {
        let resultValidar = validar.DADOS(filmeGenero, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFilmeGenero = await buscarFilmeGenero(id);

            if (resultBuscarFilmeGenero.status == true) {
                filmeGenero.id = Number(id);

                let result = await filmeGeneroDAO.updateFilmeGenero(tratar.DADOS(filmeGenero));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(filmeGenero);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFilmeGenero;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosFilmeGenero = async function () {

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_genero");
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

const buscarFilmeGenero = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_genero");
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

const deletarFilmeGenero = async function (id) {

    try {
        let resultBuscarFilmeGenero = await buscarFilmeGenero(id);

        if (resultBuscarFilmeGenero.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await filmeGeneroDAO.deleteFilmeGenero(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFilmeGenero;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarGenerosIdFilme = async function (idFilme) {

    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "generos");
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

const buscarFilmesIdGenero = async function (idGenero) {

    try {
        let resultValidarId = validar.ID(idGenero);

        if (resultValidarId == false) {
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(idGenero);

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

const deletarGenerosIdFilme = async function (idFilme) {

    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme);

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
    inserirNovoFilmeGenero,
    atualizarFilmeGenero,
    listarTodosFilmeGenero,
    buscarFilmeGenero,
    deletarFilmeGenero,
    buscarGenerosIdFilme,
    buscarFilmesIdGenero,
    deletarGenerosIdFilme
};