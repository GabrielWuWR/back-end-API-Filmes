
const { mensagem } = require('../modulo/configMessages.js');
const fotoPessoaDAO = require('../../model/DAO/foto_pessoa/foto_pessoa.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    foto: { necessario: true, minimo: 1, maximo: 256, tipo: "string" },
    id_pessoa: { necessario: true, tipo: "number" }
};

const inserirNovaFotoPessoa = async function (fotoPessoa, contentType) {

    try {
        let resultValidar = validar.DADOS(fotoPessoa, regras, contentType);

        if (resultValidar == false) {
            let result = await fotoPessoaDAO.insertFotoPessoa(tratar.DADOS(fotoPessoa));

            if (result) {
                fotoPessoa.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(fotoPessoa);
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

const atualizarFotoPessoa = async function (fotoPessoa, id, contentType) {

    try {
        let resultValidar = validar.DADOS(fotoPessoa, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarFotoPessoa = await buscarFotoPessoa(id);

            if (resultBuscarFotoPessoa.status == true) {
                fotoPessoa.id = Number(id);

                let result = await fotoPessoaDAO.updateFotoPessoa(tratar.DADOS(fotoPessoa));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(fotoPessoa);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFotoPessoa;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodasFotosPessoa = async function () {

    try {
        let result = await fotoPessoaDAO.selectAllFotoPessoa();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "fotos_pessoa");
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

const buscarFotoPessoa = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await fotoPessoaDAO.selectByIdFotoPessoa(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "foto_pessoa");
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

const deletarFotoPessoa = async function (id) {

    try {
        let resultBuscarFotoPessoa = await buscarFotoPessoa(id);

        if (resultBuscarFotoPessoa.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await fotoPessoaDAO.deleteFotoPessoa(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarFotoPessoa;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarFotosIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await fotoPessoaDAO.selectFotosByIdPessoa(idPessoa);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "fotos");
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

const deletarFotosIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await fotoPessoaDAO.deleteFotosByIdPessoa(idPessoa);

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
    inserirNovaFotoPessoa,
    atualizarFotoPessoa,
    listarTodasFotosPessoa,
    buscarFotoPessoa,
    deletarFotoPessoa,
    buscarFotosIdPessoa,
    deletarFotosIdPessoa
};