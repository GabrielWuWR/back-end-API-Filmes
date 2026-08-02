
const { mensagem } = require('../modulo/configMessages.js');
const filmeIdiomasDAO = require('../../model/DAO/filme_idiomas/filme_idiomas.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_idiomas: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" },
    original: { necessario: true, minimo: 0, maximo: 1, tipo: "number"}
};

const inserirNovoFilmeIdiomas = async function (filmeIdiomas, contentType) {

    try {
        let resultValidar = validar.DADOS(filmeIdiomas, regras, contentType);

        if (resultValidar == false) {
            let result = await filmeIdiomasDAO.insertFilmeIdiomas(tratar.DADOS(filmeIdiomas));

            if (result) {
                filmeIdiomas.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(filmeIdiomas);
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

const atualizarFilmeIdiomas = async function (filmeIdiomas, id, contentType) {

    try {
        let resultValidar = validar.DADOS(filmeIdiomas, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFilmeIdiomas = await buscarFilmeIdiomas(id);

            if (resultBuscarFilmeIdiomas.status == true) {
                filmeIdiomas.id = Number(id);

                let result = await filmeIdiomasDAO.updateFilmeIdiomas(tratar.DADOS(filmeIdiomas));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(filmeIdiomas);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFilmeIdiomas;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosFilmeIdiomas = async function () {

    try {
        let result = await filmeIdiomasDAO.selectAllFilmeIdiomas();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_idiomas");
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

const buscarFilmeIdiomas = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await filmeIdiomasDAO.selectByIdFilmeIdiomas(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme_idiomas");
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

const deletarFilmeIdiomas = async function (id) {

    try {
        let resultBuscarFilmeIdiomas = await buscarFilmeIdiomas(id);

        if (resultBuscarFilmeIdiomas.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await filmeIdiomasDAO.deleteFilmeIdiomas(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFilmeIdiomas;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarIdiomasIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmeIdiomasDAO.selectIdiomasByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "idiomas");
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

const buscarFilmesIdIdioma = async function (idIdioma) {
    try {
        let resultValidarId = validar.ID(idIdioma);

        if (resultValidarId == false) {
            let result = await filmeIdiomasDAO.selectFilmesByIdIdioma(idIdioma);

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

const deletarIdiomasIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await filmeIdiomasDAO.deleteIdiomasByIdFilme(idFilme);

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
    inserirNovoFilmeIdiomas,
    atualizarFilmeIdiomas,
    listarTodosFilmeIdiomas,
    buscarFilmeIdiomas,
    deletarFilmeIdiomas,
    buscarIdiomasIdFilme,
    buscarFilmesIdIdioma,
    deletarIdiomasIdFilme
};