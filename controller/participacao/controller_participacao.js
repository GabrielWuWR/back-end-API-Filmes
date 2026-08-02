const { mensagem } = require('../modulo/configMessages.js');
const participacaoDAO = require('../../model/DAO/participacao/participacao.js');


const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    salario: { necessario: false, maximo: 45, tipo: "string" },
    id_pessoa: { necessario: true, tipo: "number" },
    id_filme: { necessario: true, tipo: "number" }
};

const controllerParticipacaoCuriosidade = require('./controller_participacao_curiosidade.js');
const controllerTecnica = require('../tecnica/controller_tecnica.js');
const controllerAtor = require('../ator/controller_ator.js');

const inserirNovaParticipacao = async function (participacao, contentType) {

    try {
        let resultValidar = validar.DADOS(participacao, regras, contentType);

        if (resultValidar == false) {
            let dadosParticipacao = tratar.DADOS(participacao, [
                "salario",
                "id_pessoa",
                "id_filme"
            ]);

            let result = await participacaoDAO.insertParticipacao(dadosParticipacao);

            if (result) {
                participacao.id = result;
                let erroRelacionamento = false;

                if (participacao.curiosidades && participacao.curiosidades.length > 0) {
                    for (let itemCuriosidade of participacao.curiosidades) {
                        let participacaoCuriosidade = {
                            "id_participacao": participacao.id,
                            "id_curiosidades": itemCuriosidade.id
                        };
                        let resultCuriosidade = await controllerParticipacaoCuriosidade.inserirNovaParticipacaoCuriosidade(participacaoCuriosidade, contentType);

                        if (resultCuriosidade.status == false) {
                            erroRelacionamento = true;
                        }
                    }
                }

                if (participacao.cargos_tecnicos && participacao.cargos_tecnicos.length > 0) {
                    for (let itemTecnica of participacao.cargos_tecnicos) {
                        let tecnica = {
                            "id_participacao": participacao.id,
                            "id_ocupacoes": itemTecnica.id
                        };
                        let resultTecnica = await controllerTecnica.inserirNovaTecnica(tecnica, contentType);

                        if (resultTecnica.status == false) {
                            erroRelacionamento = true;
                        }
                    }
                }

                if (participacao.atuacoes && participacao.atuacoes.length > 0) {
                    for (let itemAtor of participacao.atuacoes) {
                        let ator = {
                            "id_participacao": participacao.id,
                            "id_tipo_atuacao": itemAtor.id_tipo_atuacao,
                            "ordem_credito": itemAtor.ordem_credito,
                            "personagens": itemAtor.personagens
                        };
                        let resultAtor = await controllerAtor.inserirNovoAtor(ator, contentType);

                        if (resultAtor.status == false) {
                            erroRelacionamento = true;
                        }
                    }
                }

                if (erroRelacionamento == true) {
                    return mensagem.SUCESSO_CRIAR_ITEM_AVISO(participacao);
                } else {
                    return mensagem.SUCESSO_CRIAR_ITEM(participacao);
                }

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

const atualizarParticipacao = async function (participacao, id, contentType) {

    try {
        let resultValidar = validar.DADOS(participacao, regras, contentType);

        if (resultValidar == false) {
            let dadosParticipacao = tratar.DADOS(participacao, [
                "id",
                "salario",
                "id_pessoa",
                "id_filme"
            ]);

            let result = await participacaoDAO.updateParticipacao(dadosParticipacao);

            if (resultBuscar.status == true) {
                participacao.id = Number(id);

                let result = await participacaoDAO.updateParticipacao(tratar.DADOS(participacao));

                if (result) {
                    let erroRelacionamento = false;

                    if (participacao.curiosidades !== undefined) {
                        let resultDeleteCuriosidades = await controllerParticipacaoCuriosidade.deletarCuriosidadesIdParticipacao(participacao.id);

                        if (resultDeleteCuriosidades.status == true) {
                            if (participacao.curiosidades.length > 0) {
                                for (let itemCuriosidade of participacao.curiosidades) {
                                    let participacaoCuriosidade = {
                                        "id_participacao": participacao.id,
                                        "id_curiosidades": itemCuriosidade.id
                                    };
                                    let res = await controllerParticipacaoCuriosidade.inserirNovaParticipacaoCuriosidade(participacaoCuriosidade, contentType);

                                    if (res.status == false) {
                                        erroRelacionamento = true;
                                    }
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }

                        if (participacao.cargos_tecnicos !== undefined) {
                            let resultDeleteTecnicas = await controllerTecnica.deletarOcupacoesIdParticipacao(participacao.id);

                            if (resultDeleteTecnicas.status == true) {
                                if (participacao.cargos_tecnicos.length > 0) {
                                    for (let itemTecnica of participacao.cargos_tecnicos) {
                                        let tecnica = {
                                            "id_participacao": participacao.id,
                                            "id_ocupacoes": itemTecnica.id
                                        };
                                        let res = await controllerTecnica.inserirNovaTecnica(tecnica, contentType);

                                        if (res.status == false) {
                                            erroRelacionamento = true;
                                        }
                                    }
                                }
                            } else {
                                erroRelacionamento = true;
                            }
                        }

                        if (participacao.atuacoes !== undefined) {
                            let resultDeleteAtores = await controllerAtor.deletarAtoresIdParticipacao(participacao.id);

                            if (resultDeleteAtores.status == true) {
                                if (participacao.atuacoes.length > 0) {
                                    for (let itemAtor of participacao.atuacoes) {
                                        let ator = {
                                            "id_participacao": participacao.id,
                                            "id_tipo_atuacao": itemAtor.id_tipo_atuacao,
                                            "ordem_credito": itemAtor.ordem_credito,
                                            "personagens": itemAtor.personagens
                                        };
                                        let res = await controllerAtor.inserirNovoAtor(ator, contentType);

                                        if (res.status == false) {
                                            erroRelacionamento = true;
                                        }
                                    }
                                }
                            } else {
                                erroRelacionamento = true;
                            }
                        }
                    }

                    if (erroRelacionamento == true) {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM_AVISO(participacao);
                    } else {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM(participacao);
                    }

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

const listarTodasParticipacoes = async function () {

    try {
        let result = await participacaoDAO.selectAllParticipacoes();

        if (result) {
            if (result.length > 0) {

                for (let participacao of result) {
                    let resultCuriosidades = await controllerParticipacaoCuriosidade.buscarCuriosidadesIdParticipacao(participacao.id);
                    if (resultCuriosidades.status == true) {
                        participacao.curiosidades = resultCuriosidades.response.curiosidades;
                    }

                    let idDaParticipacao;
                    if (participacao.id_participacao) {
                        idDaParticipacao = participacao.id_participacao;
                    } else {
                        idDaParticipacao = participacao.id;
                    }

                    let resultTecnicas = await controllerTecnica.buscarOcupacoesIdParticipacao(idDaParticipacao);
                    if (resultTecnicas.status == true) {
                        participacao.cargos_tecnicos = resultTecnicas.response.ocupacoes;
                    }

                    let resultAtores = await controllerAtor.buscarAtoresIdParticipacao(idDaParticipacao);
                    if (resultAtores.status == true) {
                        for (let ator of resultAtores.response.atores) {
                            delete ator.id_participacao;
                        }
                        participacao.atuacoes = resultAtores.response.atores;
                    }
                }

                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "participacoes");
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

const buscarParticipacao = async function (id) {

    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await participacaoDAO.selectByIdParticipacao(id);

            if (result) {
                if (result.length > 0) {

                    for (let participacao of result) {
                        let resultCuriosidades = await controllerParticipacaoCuriosidade.buscarCuriosidadesIdParticipacao(participacao.id);
                        if (resultCuriosidades.status == true) {
                            participacao.curiosidades = resultCuriosidades.response.curiosidades;
                        }

                        let idDaParticipacao;
                        if (participacao.id_participacao) {
                            idDaParticipacao = participacao.id_participacao;
                        } else {
                            idDaParticipacao = participacao.id;
                        }

                        let resultTecnicas = await controllerTecnica.buscarOcupacoesIdParticipacao(idDaParticipacao);
                        if (resultTecnicas.status == true) {
                            participacao.cargos_tecnicos = resultTecnicas.response.ocupacoes;
                        }

                        let resultAtores = await controllerAtor.buscarAtoresIdParticipacao(idDaParticipacao);
                        if (resultAtores.status == true) {
                            for (let ator of resultAtores.response.atores) {
                                delete ator.id_participacao;
                            }
                            participacao.atuacoes = resultAtores.response.atores;
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "participacao");
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

const deletarParticipacao = async function (id) {

    try {
        let resultBuscar = await buscarParticipacao(id);

        if (resultBuscar.status == true) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await participacaoDAO.deleteParticipacao(id);

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

const buscarParticipacoesIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await participacaoDAO.selectParticipacoesByIdFilme(idFilme);

            if (result) {
                if (result.length > 0) {

                    for (let participacao of result) {
                        let idDaParticipacao;
                        if (participacao.id_participacao) {
                            idDaParticipacao = participacao.id_participacao;
                        } else {
                            idDaParticipacao = participacao.id;
                        }

                        let resultCuriosidades = await controllerParticipacaoCuriosidade.buscarCuriosidadesIdParticipacao(idDaParticipacao);
                        if (resultCuriosidades.status == true) {
                            participacao.curiosidades = resultCuriosidades.response.curiosidades;
                        }

                        let resultTecnicas = await controllerTecnica.buscarOcupacoesIdParticipacao(idDaParticipacao);
                        if (resultTecnicas.status == true) {
                            participacao.cargos_tecnicos = resultTecnicas.response.ocupacoes;
                        }

                        let resultAtores = await controllerAtor.buscarAtoresIdParticipacao(idDaParticipacao);
                        if (resultAtores.status == true) {
                            for (let ator of resultAtores.response.atores) {
                                delete ator.id_participacao;
                            }
                            participacao.atuacoes = resultAtores.response.atores;
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "participacoes");
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

const buscarElencoIdFilme = async function (idFilme) {
    try {
        let result = await participacaoDAO.selectElencoByIdFilme(idFilme);

        if (result && result.length > 0) {
            let elencoFormatado = [];

            result.forEach(linha => {

                let ator = null;

                for (let i = 0; i < elencoFormatado.length; i++) {
                    if (elencoFormatado[i].atuacao.id === linha.id_ator) {
                        ator = elencoFormatado[i];
                        break;
                    }
                }

                if (!ator) {
                    ator = {
                        participacao: {
                            id: linha.id_participacao,
                            salario: linha.salario,
                            curiosidades: []
                        },
                        pessoa: {
                            id: linha.id_pessoa,
                            nome: linha.nome_ator
                        },
                        atuacao: {
                            id: linha.id_ator,
                            ordem_credito: linha.ordem_credito,
                            tipo_atuacao: linha.tipo_atuacao
                        },
                        personagens: []
                    };

                    elencoFormatado.push(ator);
                }

                if (linha.id_personagem) {
                    let personagemExiste = ator.personagens.some(p => p.id_personagem === linha.id_personagem);
                    if (!personagemExiste) {
                        ator.personagens.push({
                            id_personagem: linha.id_personagem,
                            nome: linha.nome_personagem,
                            descricao: linha.descricao_personagem
                        });
                    }
                }

                if (linha.id_curiosidade) {
                    let curiosidadeExiste = ator.participacao.curiosidades.some(c => c.id === linha.id_curiosidade);
                    if (!curiosidadeExiste) {
                        ator.participacao.curiosidades.push({
                            id: linha.id_curiosidade,
                            curiosidade: linha.texto_curiosidade
                        });
                    }
                }
            });

            return mensagem.RETORNAR_ITENS_ENCONTRADOS(elencoFormatado, "elenco");
        } else {
            return mensagem.ERRO_NADA_ENCONTRADO();
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const deletarParticipacoesIdFilme = async function (idFilme) {
    try {
        let resultValidarId = validar.ID(idFilme);

        if (resultValidarId == false) {
            let result = await participacaoDAO.deleteParticipacoesByIdFilme(idFilme);

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
    inserirNovaParticipacao,
    atualizarParticipacao,
    listarTodasParticipacoes,
    buscarParticipacao,
    deletarParticipacao,
    buscarParticipacoesIdFilme,
    deletarParticipacoesIdFilme,
    buscarElencoIdFilme
};