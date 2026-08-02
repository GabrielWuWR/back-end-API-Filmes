
const { mensagem } = require('../modulo/configMessages.js');
const imagensDAO = require('../../model/DAO/imagens/imagens.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    imagem: { necessario: true, minimo: 1, maximo: 256, tipo: "string" },
    id_tipo_imagem: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" }
};

const inserirNovaImagem = async function (dadosImagem, contentType) {

    try {
        let resultValidar = validar.DADOS(dadosImagem, regras, contentType);

        if (resultValidar == false) {
            let result = await imagensDAO.insertImagem(tratar.DADOS(dadosImagem));

            if (result) {
                dadosImagem.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(dadosImagem);
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

const atualizarImagem = async function (dadosImagem, id, contentType) {

    try {
        let resultValidar = validar.DADOS(dadosImagem, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarImagem = await buscarImagem(id);

            if (resultBuscarImagem.status == true) {
                dadosImagem.id = Number(id);

                let result = await imagensDAO.updateImagem(tratar.DADOS(dadosImagem));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(dadosImagem);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarImagem;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodasImagens = async function () {

    try {
        let result = await imagensDAO.selectAllImagens();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "imagens");
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

const buscarImagem = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await imagensDAO.selectByIdImagem(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "imagem");
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

const deletarImagem = async function (id) {

    try {
        let resultBuscarImagem = await buscarImagem(id);

        if (resultBuscarImagem.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await imagensDAO.deleteImagem(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarImagem;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const buscarImagensIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await imagensDAO.selectImagensByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "imagens");
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

const deletarImagensIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await imagensDAO.deleteImagensByIdFilme(idFilme);

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
    inserirNovaImagem,
    atualizarImagem,
    listarTodasImagens,
    buscarImagem,
    deletarImagem,
    buscarImagensIdFilme,
    deletarImagensIdFilme
};