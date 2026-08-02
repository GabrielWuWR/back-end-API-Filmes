
const { mensagem } = require('../modulo/configMessages.js');
const atorIdiomasDAO = require('../../model/DAO/ator_idiomas/ator_idiomas.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_ator: { necessario: true, tipo: "number" },
    id_idiomas: { necessario: true, tipo: "number" }
};

const inserirNovoAtorIdiomas = async function (atorIdiomas, contentType) {

    try {
        let resultValidar = validar.DADOS(atorIdiomas, regras, contentType);

        if (resultValidar == false) {
            let result = await atorIdiomasDAO.insertAtorIdiomas(tratar.DADOS(atorIdiomas));

            if (result) {
                atorIdiomas.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(atorIdiomas);
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

const atualizarAtorIdiomas = async function (atorIdiomas, id, contentType) {

    try {
        let resultValidar = validar.DADOS(atorIdiomas, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarAtorIdiomas(id);

            if (resultBuscar.status == true) {
                atorIdiomas.id = Number(id);

                let result = await atorIdiomasDAO.updateAtorIdiomas(tratar.DADOS(atorIdiomas));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(atorIdiomas);
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

const listarTodosAtorIdiomas = async function () {

    try {
        let result = await atorIdiomasDAO.selectAllAtorIdiomas();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ator_idiomas");
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

const buscarAtorIdiomas = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await atorIdiomasDAO.selectByIdAtorIdiomas(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ator_idioma");
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

const deletarAtorIdiomas = async function (id) {

    try {
        let resultBuscar = await buscarAtorIdiomas(id);

        if (resultBuscar.status == true) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await atorIdiomasDAO.deleteAtorIdiomas(id);

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

const buscarIdiomasIdAtor = async function (idAtor) {
    try {
        let resultValidarId = validar.ID(idAtor);

        if (resultValidarId == false) {
            let result = await atorIdiomasDAO.selectIdiomasByIdAtor(idAtor);

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

const deletarIdiomasIdAtor = async function (idAtor) {
    try {
        let resultValidarId = validar.ID(idAtor);

        if (resultValidarId == false) {
            let result = await atorIdiomasDAO.deleteIdiomasByIdAtor(idAtor);

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
    inserirNovoAtorIdiomas,
    atualizarAtorIdiomas,
    listarTodosAtorIdiomas,
    buscarAtorIdiomas,
    deletarAtorIdiomas,
    buscarIdiomasIdAtor,
    deletarIdiomasIdAtor
};