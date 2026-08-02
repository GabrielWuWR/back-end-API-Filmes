
const { mensagem } = require('../modulo/configMessages.js');
const pessoaCuriosidadesDAO = require('../../model/DAO/pessoa_curiosidades/pessoa_curiosidades.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_pessoa: { necessario: true, tipo: "number" },
    id_curiosidades: { necessario: true, tipo: "number" }
};

const inserirNovaPessoaCuriosidade = async function (pessoaCuriosidade, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaCuriosidade, regras, contentType);

        if (resultValidar == false) {
            let result = await pessoaCuriosidadesDAO.insertPessoaCuriosidade(tratar.DADOS(pessoaCuriosidade));

            if (result) {
                pessoaCuriosidade.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(pessoaCuriosidade);
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

const atualizarPessoaCuriosidade = async function (pessoaCuriosidade, id, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaCuriosidade, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarPessoaCuriosidade(id);

            if (resultBuscar.status == true) {
                pessoaCuriosidade.id = Number(id);

                let result = await pessoaCuriosidadesDAO.updatePessoaCuriosidade(tratar.DADOS(pessoaCuriosidade));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(pessoaCuriosidade);
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

const listarTodasPessoaCuriosidades = async function () {

    try {
        let result = await pessoaCuriosidadesDAO.selectAllPessoaCuriosidades();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_curiosidades");
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

const buscarPessoaCuriosidade = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await pessoaCuriosidadesDAO.selectByIdPessoaCuriosidade(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_curiosidade");
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

const deletarPessoaCuriosidade = async function (id) {

    try {
        let resultBuscar = await buscarPessoaCuriosidade(id);

        if (resultBuscar.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await pessoaCuriosidadesDAO.deletePessoaCuriosidade(id);

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

const buscarCuriosidadesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaCuriosidadesDAO.selectCuriosidadesByIdPessoa(idPessoa);

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

const deletarCuriosidadesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaCuriosidadesDAO.deleteCuriosidadesByIdPessoa(idPessoa);

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
    inserirNovaPessoaCuriosidade,
    atualizarPessoaCuriosidade,
    listarTodasPessoaCuriosidades,
    buscarPessoaCuriosidade,
    deletarPessoaCuriosidade,
    buscarCuriosidadesIdPessoa,
    deletarCuriosidadesIdPessoa
};