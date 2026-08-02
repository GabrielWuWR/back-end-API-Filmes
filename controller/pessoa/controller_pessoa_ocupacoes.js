
const { mensagem } = require('../modulo/configMessages.js');
const pessoaOcupacaoDAO = require('../../model/DAO/pessoa_ocupacao/pessoa_ocupacao.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_pessoa: { necessario: true, tipo: "number" },
    id_ocupacoes: { necessario: true, tipo: "number" }
};

const inserirNovaPessoaOcupacao = async function (pessoaOcupacao, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaOcupacao, regras, contentType);

        if (resultValidar == false) {
            let result = await pessoaOcupacaoDAO.insertPessoaOcupacao(tratar.DADOS(pessoaOcupacao));

            if (result) {
                pessoaOcupacao.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(pessoaOcupacao);
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

const atualizarPessoaOcupacao = async function (pessoaOcupacao, id, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaOcupacao, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarPessoaOcupacao(id);

            if (resultBuscar.status == true) {
                pessoaOcupacao.id = Number(id);

                let result = await pessoaOcupacaoDAO.updatePessoaOcupacao(tratar.DADOS(pessoaOcupacao));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(pessoaOcupacao);
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

const listarTodasPessoaOcupacoes = async function () {

    try {
        let result = await pessoaOcupacaoDAO.selectAllPessoaOcupacoes();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_ocupacoes");
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

const buscarPessoaOcupacao = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await pessoaOcupacaoDAO.selectByIdPessoaOcupacao(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_ocupacao");
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

const deletarPessoaOcupacao = async function (id) {

    try {
        let resultBuscar = await buscarPessoaOcupacao(id);

        if (resultBuscar.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await pessoaOcupacaoDAO.deletePessoaOcupacao(id);

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

const buscarOcupacoesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaOcupacaoDAO.selectOcupacoesByIdPessoa(idPessoa);

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
        return mensagem.ERRO_CONTROLLER();
    }
};

const deletarOcupacoesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaOcupacaoDAO.deleteOcupacoesByIdPessoa(idPessoa);

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
    inserirNovaPessoaOcupacao,
    atualizarPessoaOcupacao,
    listarTodasPessoaOcupacoes,
    buscarPessoaOcupacao,
    deletarPessoaOcupacao,
    buscarOcupacoesIdPessoa,
    deletarOcupacoesIdPessoa
};