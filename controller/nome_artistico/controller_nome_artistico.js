
const { mensagem } = require('../modulo/configMessages.js');
const nomeArtisticoDAO = require('../../model/DAO/nome_artistico/nome_artistico.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    nome: { necessario: true, minimo: 1, maximo: 100, tipo: "string" },
    id_pessoa: { necessario: true, tipo: "number" }
};

const inserirNovoNomeArtistico = async function (nomeArtistico, contentType) {

    try {
        let resultValidar = validar.DADOS(nomeArtistico, regras, contentType);

        if (resultValidar == false) {
            let result = await nomeArtisticoDAO.insertNomeArtistico(tratar.DADOS(nomeArtistico));

            if (result) {
                nomeArtistico.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(nomeArtistico);
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

const atualizarNomeArtistico = async function (nomeArtistico, id, contentType) {

    try {
        let resultValidar = validar.DADOS(nomeArtistico, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarNome = await buscarNomeArtistico(id);

            if (resultBuscarNome.status == true) {
                nomeArtistico.id = Number(id);

                let result = await nomeArtisticoDAO.updateNomeArtistico(tratar.DADOS(nomeArtistico));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(nomeArtistico);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarNome;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosNomesArtisticos = async function () {

    try {
        let result = await nomeArtisticoDAO.selectAllNomesArtisticos();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "nomes_artisticos");
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

const buscarNomeArtistico = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await nomeArtisticoDAO.selectByIdNomeArtistico(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "nome_artistico");
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

const deletarNomeArtistico = async function (id) {

    try {
        let resultBuscarNome = await buscarNomeArtistico(id);

        if (resultBuscarNome.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await nomeArtisticoDAO.deleteNomeArtistico(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarNome;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarNomesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await nomeArtisticoDAO.selectNomesByIdPessoa(idPessoa);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "nomes_artisticos");
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

const deletarNomesIdPessoa = async function (idPessoa) {
    try {
        let resultValidarId = validar.ID(idPessoa);

        if (resultValidarId == false) {
            let result = await nomeArtisticoDAO.deleteNomesByIdPessoa(idPessoa);

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
    inserirNovoNomeArtistico,
    atualizarNomeArtistico,
    listarTodosNomesArtisticos,
    buscarNomeArtistico,
    deletarNomeArtistico,
    buscarNomesIdPessoa,
    deletarNomesIdPessoa
};