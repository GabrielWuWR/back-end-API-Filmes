
const { mensagem } = require('../modulo/configMessages.js');
const pessoaPaisOrigemDAO = require('../../model/DAO/pessoa_pais_origem/pessoa_pais_origem.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_pessoa: { necessario: true, tipo: "number" },
    id_pais: { necessario: true, tipo: "number" }
};

const inserirNovaPessoaPaisOrigem = async function (pessoaPais, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaPais, regras, contentType);

        if (resultValidar == false) {
            let result = await pessoaPaisOrigemDAO.insertPessoaPaisOrigem(tratar.DADOS(pessoaPais));

            if (result) {
                pessoaPais.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(pessoaPais);
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

const atualizarPessoaPaisOrigem = async function (pessoaPais, id, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaPais, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarPessoaPaisOrigem(id);

            if (resultBuscar.status == true) {
                pessoaPais.id = Number(id);

                let result = await pessoaPaisOrigemDAO.updatePessoaPaisOrigem(tratar.DADOS(pessoaPais));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(pessoaPais);
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

const listarTodasPessoaPaisOrigens = async function () {

    try {
        let result = await pessoaPaisOrigemDAO.selectAllPessoaPaisOrigens();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_paises");
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

const buscarPessoaPaisOrigem = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await pessoaPaisOrigemDAO.selectByIdPessoaPaisOrigem(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_pais");
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

const deletarPessoaPaisOrigem = async function (id) {

    try {
        let resultBuscar = await buscarPessoaPaisOrigem(id);

        if (resultBuscar.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await pessoaPaisOrigemDAO.deletePessoaPaisOrigem(id);

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

const buscarPaisesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaPaisOrigemDAO.selectPaisesByIdPessoa(idPessoa);

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

const deletarPaisesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaPaisOrigemDAO.deletePaisesByIdPessoa(idPessoa);

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
    inserirNovaPessoaPaisOrigem,
    atualizarPessoaPaisOrigem,
    listarTodasPessoaPaisOrigens,
    buscarPessoaPaisOrigem,
    deletarPessoaPaisOrigem,
    buscarPaisesIdPessoa,
    deletarPaisesIdPessoa
};