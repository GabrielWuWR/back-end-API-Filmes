/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento e manipulação
 * de dados para realizar o CRUD da tabela intermediária participacao_curiosidade.
 * Autor: Gabriel
 ************************************************************************************************************/

const { mensagem } = require('../modulo/configMessages.js');
const participacaoCuriosidadeDAO = require('../../model/DAO/participacao_curioidade/participacao_curiosidade.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_curiosidades: { necessario: true, tipo: "number" },
    id_participacao: { necessario: true, tipo: "number" }
};

const inserirNovaParticipacaoCuriosidade = async function (participacaoCuriosidade, contentType) {

    try {
        let resultValidar = validar.DADOS(participacaoCuriosidade, regras, contentType);

        if (resultValidar == false) {
            let result = await participacaoCuriosidadeDAO.insertParticipacaoCuriosidade(tratar.DADOS(participacaoCuriosidade));

            if (result) {
                participacaoCuriosidade.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(participacaoCuriosidade);
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

const atualizarParticipacaoCuriosidade = async function (participacaoCuriosidade, id, contentType) {

    try {
        let resultValidar = validar.DADOS(participacaoCuriosidade, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarParticipacaoCuriosidade(id);

            if (resultBuscar.status == true) {
                participacaoCuriosidade.id = Number(id);

                let result = await participacaoCuriosidadeDAO.updateParticipacaoCuriosidade(tratar.DADOS(participacaoCuriosidade));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(participacaoCuriosidade);
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

const listarTodasParticipacaoCuriosidades = async function () {

    try {
        let result = await participacaoCuriosidadeDAO.selectAllParticipacaoCuriosidades();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "participacao_curiosidades");
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

const buscarParticipacaoCuriosidade = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await participacaoCuriosidadeDAO.selectByIdParticipacaoCuriosidade(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "participacao_curiosidade");
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

const deletarParticipacaoCuriosidade = async function (id) {

    try {
        let resultBuscar = await buscarParticipacaoCuriosidade(id);

        if (resultBuscar.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await participacaoCuriosidadeDAO.deleteParticipacaoCuriosidade(id);

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

const buscarCuriosidadesIdParticipacao = async function (idParticipacao) {
    try {
        let resultValidarId = validar.ID(idParticipacao);

        if (resultValidarId == false) {
            let result = await participacaoCuriosidadeDAO.selectCuriosidadesByIdParticipacao(idParticipacao);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "curiosidades");
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

const deletarCuriosidadesIdParticipacao = async function (idParticipacao) {
    try {
        let resultValidarId = validar.ID(idParticipacao);

        if (resultValidarId == false) {
            let result = await participacaoCuriosidadeDAO.deleteCuriosidadesByIdParticipacao(idParticipacao);

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
    inserirNovaParticipacaoCuriosidade,
    atualizarParticipacaoCuriosidade,
    listarTodasParticipacaoCuriosidades,
    buscarParticipacaoCuriosidade,
    deletarParticipacaoCuriosidade,
    buscarCuriosidadesIdParticipacao,
    deletarCuriosidadesIdParticipacao
};