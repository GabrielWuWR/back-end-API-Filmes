
const { mensagem } = require('../modulo/configMessages.js');
const sexoDAO = require('../../model/DAO/sexo/sexo.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    sexo: { necessario: true, minimo: 1, maximo: 15, tipo: "string" },
    sigla: { necessario: true, minimo: 1, maximo: 5, tipo: "string" }
};

const inserirNovoSexo = async function (sexo, contentType) {

    try {
        let resultValidar = validar.DADOS(sexo, regras, contentType);

        if (resultValidar == false) {
            let result = await sexoDAO.insertSexo(tratar.DADOS(sexo));

            if (result) {
                sexo.id = result;
                return mensagem.SUCESSO_CRIAR_ITEM(sexo);
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

const atualizarSexo = async function (sexo, id, contentType) {

    try {
        let resultValidar = validar.DADOS(sexo, regras, contentType);

        if (resultValidar == false) {

            let resultBuscarSexo = await buscarSexo(id);

            if (resultBuscarSexo.status == true) {
                sexo.id = Number(id);

                let result = await sexoDAO.updateSexo(tratar.DADOS(sexo));

                if (result) {
                    return mensagem.SUCESSO_ATUALIZAR_ITEM(sexo);
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarSexo;
            }
        } else {
            return resultValidar;
        }

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodosSexos = async function () {

    try {
        let result = await sexoDAO.selectAllSexos();

        if (result) {
            if (result.length > 0) {
                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "sexos");
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

const buscarSexo = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await sexoDAO.selectByIdSexo(id);

            if (result) {
                if (result.length > 0) {
                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "sexo");
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

const deletarSexo = async function (id) {

    try {
        let resultBuscarSexo = await buscarSexo(id);

        if (resultBuscarSexo.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await sexoDAO.deleteSexo(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarSexo;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovoSexo,
    atualizarSexo,
    listarTodosSexos,
    buscarSexo,
    deletarSexo
};