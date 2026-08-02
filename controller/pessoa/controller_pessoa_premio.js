
const { mensagem } = require('../modulo/configMessages.js');
const pessoaPremioDAO = require('../../model/DAO/pessoa_premio/pessoa_premio.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    id_pessoa: { necessario: true, tipo: "number" },
    id_premio: { necessario: true, tipo: "number" }
};

const inserirNovaPessoaPremio = async function (pessoaPremio, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaPremio, regras, contentType);

        if (resultValidar == false) {
            let result = await pessoaPremioDAO.insertPessoaPremio(tratar.DADOS(pessoaPremio));

            if (result) {
                pessoaPremio.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(pessoaPremio);
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

const atualizarPessoaPremio = async function (pessoaPremio, id, contentType) {

    try {
        let resultValidar = validar.DADOS(pessoaPremio, regras, contentType);

        if (resultValidar == false) {

            let resultBuscar = await buscarPessoaPremio(id);

            if (resultBuscar.status == true) {
                pessoaPremio.id = Number(id);

                let result = await pessoaPremioDAO.updatePessoaPremio(tratar.DADOS(pessoaPremio));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(pessoaPremio);
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

const listarTodasPessoaPremios = async function () {

    try {
        let result = await pessoaPremioDAO.selectAllPessoaPremios();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_premios");
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

const buscarPessoaPremio = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await pessoaPremioDAO.selectByIdPessoaPremio(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa_premio");
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

const deletarPessoaPremio = async function (id) {

    try {
        let resultBuscar = await buscarPessoaPremio(id);

        if (resultBuscar.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await pessoaPremioDAO.deletePessoaPremio(id);

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

const buscarPremiosIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaPremioDAO.selectPremiosByIdPessoa(idPessoa);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "premios");
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

const deletarPremiosIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await pessoaPremioDAO.deletePremiosByIdPessoa(idPessoa);

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
    inserirNovaPessoaPremio,
    atualizarPessoaPremio,
    listarTodasPessoaPremios,
    buscarPessoaPremio,
    deletarPessoaPremio,
    buscarPremiosIdPessoa,
    deletarPremiosIdPessoa
};