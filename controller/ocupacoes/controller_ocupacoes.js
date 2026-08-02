
const { mensagem } = require('../modulo/configMessages.js');
const ocupacoesDAO = require('../../model/DAO/ocupacoes/ocupacoes.js');

const controllerSetor = require('../setor/controller_setor.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    nome: { necessario: true, minimo: 1, maximo: 150, tipo: "string" },
    descricao: { necessario: false, tipo: "string" },
    id_setor: { necessario: true, tipo: "number" }
};

const inserirNovaOcupacao = async function (ocupacao, contentType) {

    try {
        let resultValidar = validar.DADOS(ocupacao, regras, contentType);

        if (resultValidar == false) {
            let result = await ocupacoesDAO.insertOcupacao(tratar.DADOS(ocupacao));

            if (result) {
                ocupacao.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(ocupacao);
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

const atualizarOcupacao = async function (ocupacao, id, contentType) {

    try {
        let resultValidar = validar.DADOS(ocupacao, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarOcupacao = await buscarOcupacao(id);

            if (resultBuscarOcupacao.status == true) {
                ocupacao.id = Number(id);

                let result = await ocupacoesDAO.updateOcupacao(tratar.DADOS(ocupacao));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(ocupacao);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarOcupacao;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodasOcupacoes = async function () {

    try {
        let result = await ocupacoesDAO.selectAllOcupacoes();

        if (result) {
            if (result.length > 0) {
                for (let ocupacao of result) {
                    let resultSetor = await controllerSetor.buscarSetor(ocupacao.id_setor);
                    
                    if (resultSetor.status == true) {
                        ocupacao.setor = resultSetor.response.setor;
                        delete ocupacao.id_setor;
                    }
                }

                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ocupacoes");
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

const buscarOcupacao = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await ocupacoesDAO.selectByIdOcupacao(id);

            if (result) {
                if (result.length > 0) {

                    for (let ocupacao of result) {
                        let resultSetor = await controllerSetor.buscarSetor(ocupacao.id_setor);
                        
                        if (resultSetor.status == true) {
                            ocupacao.setor = resultSetor.response.setor;
                            delete ocupacao.id_setor;
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "ocupacao");
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

const deletarOcupacao = async function (id) {

    try {
        let resultBuscarOcupacao = await buscarOcupacao(id);

        if (resultBuscarOcupacao.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await ocupacoesDAO.deleteOcupacao(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarOcupacao;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovaOcupacao,
    atualizarOcupacao,
    listarTodasOcupacoes,
    buscarOcupacao,
    deletarOcupacao
};