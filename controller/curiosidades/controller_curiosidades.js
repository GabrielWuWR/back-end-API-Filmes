
const { mensagem } = require('../modulo/configMessages.js');
const curiosidadesDAO = require('../../model/DAO/curiosidades/curiosidades.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    curiosidade: { necessario: true, minimo: 1, tipo: "string" }
};

const inserirNovaCuriosidade = async function (curiosidade, contentType) {
    try {
        let resultValidar = validar.DADOS(curiosidade, regras, contentType);

        if (resultValidar == false) {
            let result = await curiosidadesDAO.insertCuriosidade(tratar.DADOS(curiosidade));

            if (result) {
                curiosidade.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(curiosidade);
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

const atualizarCuriosidade = async function (curiosidade, id, contentType) {
    try {
        let resultValidar = validar.DADOS(curiosidade, regras, contentType);

        if (resultValidar == false) {
            let resultBuscar = await buscarCuriosidade(id);

            if (resultBuscar.status == true) {
                curiosidade.id = Number(id);

                let result = await curiosidadesDAO.updateCuriosidade(tratar.DADOS(curiosidade));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(curiosidade);
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

const listarTodasCuriosidades = async function () {
    try {
        let result = await curiosidadesDAO.selectAllCuriosidades();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "curiosidades");
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

const buscarCuriosidade = async function (id) {
    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await curiosidadesDAO.selectByIdCuriosidade(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "curiosidade");
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

const deletarCuriosidade = async function (id) {
    try {
        let resultBuscar = await buscarCuriosidade(id);

        if (resultBuscar.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await curiosidadesDAO.deleteCuriosidade(id);

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

module.exports = {
    inserirNovaCuriosidade,
    atualizarCuriosidade,
    listarTodasCuriosidades,
    buscarCuriosidade,
    deletarCuriosidade
};