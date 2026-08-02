
const { mensagem } = require('../modulo/configMessages.js');
const tecnicaDAO = require('../../model/DAO/tecnica/tecnica.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_ocupacoes: { necessario: true, tipo: "number" },
    id_participacao: { necessario: true, tipo: "number" }
};

const inserirNovaTecnica = async function (tecnica, contentType) {

    try {
        let resultValidar = validar.DADOS(tecnica, regras, contentType);

        if (resultValidar == false) {
            let dadosTecnica = tratar.DADOS(tecnica, [
                "id_ocupacoes",
                "id_participacao"
            ]);

            let result = await tecnicaDAO.insertTecnica(dadosTecnica);

            if (result) {
                tecnica.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(tecnica);
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

const atualizarTecnica = async function (tecnica, id, contentType) {

    try {
        let resultValidar = validar.DADOS(tecnica, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarTecnica(id);

            if (resultBuscar.status == true) {
                tecnica.id = Number(id);

                let dadosTecnica = tratar.DADOS(tecnica, [
                    "id",
                    "id_ocupacoes",
                    "id_participacao"
                ]);

                let result = await tecnicaDAO.updateTecnica(dadosTecnica);

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(tecnica);
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
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodasTecnicas = async function () {

    try {
        let result = await tecnicaDAO.selectAllTecnicas();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "tecnicas");
            } else {
                return mensagem.ERRO_NADA_ENCONTRADO();
            }
        } else {
            return mensagem.ERRO_MODEL();
        }
    } catch (error) {
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarTecnica = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await tecnicaDAO.selectByIdTecnica(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "tecnica");
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
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

const deletarTecnica = async function (id) {

    try {
        let resultBuscar = await buscarTecnica(id);

        if (resultBuscar.status == true) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await tecnicaDAO.deleteTecnica(id);

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
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarOcupacoesIdParticipacao = async function (idParticipacao) {
    try {
        let resultValidarId = validar.ID(idParticipacao);

        if (resultValidarId == false) {
            let result = await tecnicaDAO.selectOcupacoesByIdParticipacao(idParticipacao);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ocupacoes");
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
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

const deletarOcupacoesIdParticipacao = async function (idParticipacao) {
    try {
        let resultValidarId = validar.ID(idParticipacao);

        if (resultValidarId == false) {
            let result = await tecnicaDAO.deleteOcupacoesByIdParticipacao(idParticipacao);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            }
        } else {
            return resultValidarId;
        }
    } catch (error) {
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovaTecnica,
    atualizarTecnica,
    listarTodasTecnicas,
    buscarTecnica,
    deletarTecnica,
    buscarOcupacoesIdParticipacao,
    deletarOcupacoesIdParticipacao
};