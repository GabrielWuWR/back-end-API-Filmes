/*************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento, manipulação
 * de dados para realizar o CRUD de filme.
 * Autor: Gabriel
 * Versão: 1.0.17.4
 ************************************************************************************************************/

const { mensagem } = require('../modulo/configMessages.js');

const { validar } = require('../../UTILS/validador.js');
const { tratar } = require('../../UTILS/tratamento.js');

const filmeDAO = require('../../model/DAO/filme/filme.js');

const controllerClassificacao = require('../classificacao/controller_classificacao.js');

const controllerFilmeGenero = require('./controller_filme_genero.js');
const controllerFilmeProdutora = require('./controller_filme_produtora.js');
const controllerFilmeIdiomas = require('./controller_filme_idiomas.js');
const controllerImagens = require('../imagens/controller_imagens.js');
const controllerFilmePremio = require('./controller_filme_premio.js');
const controllerFilmePais = require('./controller_filme_pais.js');
const controllerTrailers = require('../trailers/controller_trailers.js');
const controllerFilmePersonagem = require('./controller_filme_personagem.js');
const controllerParticipacao = require('../participacao/controller_participacao.js');

const regras = {
    nome: { necessario: true, minimo: 1, maximo: 80, tipo: "string" },
    sinopse: { necessario: true, minimo: 1, tipo: "string" },
    data_lancamento: { necessario: true, minimo: 10, maximo: 10, tipo: "date" },
    duracao: { necessario: true, minimo: 5, tipo: "time" },
    bilheteria: { necessario: true, minimo: 1, maximo: 10, tipo: "numero" },
    valor: { necessario: false, tipo: "numero", maximo: 5 },
    avaliacao_critica: { necessario: false, tipo: "numero", maximo: 3 },
    avaliacao: { necessario: false, tipo: "numero", maximo: 3 },
    id_status_filme: { necessario: true, tipo: "numero", minimo: 1 },
    id_classificacao: { necessario: true, tipo: "numero", minimo: 1 }
};

const inserirNovoFilme = async function (filme, contentType) {
    try {
        let resultValidar = validar.DADOS(filme, regras, contentType);

        if (resultValidar == false) {
            let dadosFilme = tratar.DADOS(filme, [
                "nome",
                "sinopse",
                "data_lancamento",
                "duracao",
                "bilheteria",
                "valor",
                "avaliacao_critica",
                "avaliacao",
                "id_status_filme",
                "id_classificacao"
            ]);

            let result = await filmeDAO.insertFilme(dadosFilme);

            if (result) {
                filme.id = result;

                let avisos = [];

                if (filme.genero && filme.genero.length > 0) {
                    for (let itemFilme of filme.genero) {
                        let filmeGenero = {
                            "id_filme": filme.id,
                            "id_genero": itemFilme.id
                        };
                        let resultFilmeGenero = await controllerFilmeGenero.inserirNovoFilmeGenero(filmeGenero, contentType);

                        if (!resultFilmeGenero.status) {
                            avisos.push({
                                entidade: "genero",
                                dados: filmeGenero,
                                erro: resultFilmeGenero.message
                            });
                        }
                    }
                }

                if (filme.produtora && filme.produtora.length > 0) {
                    for (let itemProdutora of filme.produtora) {
                        let filmeProdutora = {
                            "id_filme": filme.id,
                            "id_produtora": itemProdutora.id
                        };
                        let resultProdutora = await controllerFilmeProdutora.inserirNovoFilmeProdutora(filmeProdutora, contentType);

                        if (!resultProdutora.status) {
                            avisos.push({
                                entidade: "produtora",
                                dados: filmeProdutora,
                                erro: resultProdutora.message
                            });
                        }
                    }
                }

                if (filme.idiomas && filme.idiomas.length > 0) {
                    for (let itemIdioma of filme.idiomas) {
                        let filmeIdiomas = {
                            "id_filme": filme.id,
                            "id_idiomas": itemIdioma.id,
                            "original": itemIdioma.original
                        };
                        let resultIdioma = await controllerFilmeIdiomas.inserirNovoFilmeIdiomas(filmeIdiomas, contentType);

                        if (!resultIdioma.status) {
                            avisos.push({
                                entidade: "idioma",
                                dados: filmeIdiomas,
                                erro: resultIdioma.message
                            });
                        }
                    }
                }

                if (filme.imagens && filme.imagens.length > 0) {
                    for (let itemImagem of filme.imagens) {
                        let dadosImagem = {
                            "imagem": itemImagem.imagem,
                            "id_tipo_imagem": itemImagem.id_tipo_imagem,
                            "id_filme": filme.id
                        };
                        let resultImagem = await controllerImagens.inserirNovaImagem(dadosImagem, contentType);

                        if (!resultImagem.status) {
                            avisos.push({
                                entidade: "imagem",
                                dados: dadosImagem,
                                erro: resultImagem.message
                            });
                        }
                    }
                }

                if (filme.premios && filme.premios.length > 0) {
                    for (let itemPremio of filme.premios) {
                        let filmePremio = {
                            "id_filme": filme.id,
                            "id_premio": itemPremio.id
                        };

                        let resultPremio = await controllerFilmePremio.inserirNovoFilmePremio(filmePremio, contentType);

                        if (!resultPremio.status) {
                            avisos.push({
                                entidade: "premio",
                                dados: filmePremio,
                                erro: resultPremio.message
                            });
                        }
                    }
                }

                if (filme.paises && filme.paises.length > 0) {
                    for (let itemPais of filme.paises) {
                        let filmePais = {
                            "id_filme": filme.id,
                            "id_pais": itemPais.id,
                            "origem": itemPais.origem
                        };

                        let resultPais = await controllerFilmePais.inserirNovoFilmePais(filmePais, contentType);

                        if (!resultPais.status) {
                            avisos.push({
                                entidade: "pais",
                                dados: filmePais,
                                erro: resultPais.message
                            });
                        }
                    }
                }

                if (filme.trailers && filme.trailers.length > 0) {
                    for (let itemTrailer of filme.trailers) {
                        let dadosTrailer = {
                            "trailer": itemTrailer.trailer,
                            "id_filme": filme.id
                        };

                        let resultTrailer = await controllerTrailers.inserirNovoTrailer(dadosTrailer, contentType);

                        if (!resultTrailer.status) {
                            avisos.push({
                                entidade: "trailer",
                                dados: dadosTrailer,
                                erro: resultTrailer.message
                            });
                        }
                    }
                }

                if (filme.personagens && filme.personagens.length > 0) {
                    for (let itemPersonagem of filme.personagens) {
                        let filmePersonagem = {
                            "id_filme": filme.id,
                            "id_personagem": itemPersonagem.id
                        };
                        let resultPersonagem = await controllerFilmePersonagem.inserirNovoFilmePersonagem(filmePersonagem, contentType);

                        if (!resultPersonagem.status) {
                            erroRelacionamento = true;
                        }

                        if (!resultPersonagem.status) {
                            avisos.push({
                                entidade: "personagem",
                                dados: filmePersonagem,
                                erro: resultPersonagem.message
                            });
                        }
                    }
                }

                if (filme.participacoes && filme.participacoes.length > 0) {
                    for (let itemParticipacao of filme.participacoes) {
                        let participacao = {
                            "salario": itemParticipacao.salario,
                            "id_pessoa": itemParticipacao.id_pessoa,
                            "id_filme": filme.id,
                            "curiosidades": itemParticipacao.curiosidades,
                            "atuacoes": itemParticipacao.atuacoes,
                            "cargos_tecnicos": itemParticipacao.cargos_tecnicos
                        };
                        let resultParticipacao = await controllerParticipacao.inserirNovaParticipacao(participacao, contentType);

                        if (!resultParticipacao.status) {
                            avisos.push({
                                entidade: "participacao",
                                dados: participacao,
                                erro: resultParticipacao.message
                            });
                        }
                    }
                }

                if (avisos.length > 0) {
                    return mensagem.SUCESSO_CRIAR_ITEM_AVISO(filme, avisos);
                } else {
                    return mensagem.SUCESSO_CRIAR_ITEM(filme);
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

const atualizarFilme = async function (filme, id, contentType) {
    try {
        let resultValidar = validar.DADOS(filme, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarFilme = await buscarFilme(id);

            if (resultBuscarFilme.status == true) {
                filme.id = Number(id);
                
                let dadosFilme = tratar.DADOS(filme, [
                    "id",
                    "nome",
                    "sinopse",
                    "data_lancamento",
                    "duracao",
                    "bilheteria",
                    "valor",
                    "avaliacao_critica",
                    "avaliacao",
                    "id_status_filme",
                    "id_classificacao"
                ]);
                
                
                let result = await filmeDAO.updateFilme(dadosFilme);

                if (result) {
                    let erroRelacionamento = false;

                    if (filme.genero !== undefined) {
                        let resultDeleteGeneros = await controllerFilmeGenero.deletarGenerosIdFilme(filme.id);

                        if (resultDeleteGeneros.status) {
                            if (filme.genero.length > 0) {
                                for (let itemFilme of filme.genero) {
                                    let filmeGenero = {
                                        "id_filme": filme.id,
                                        "id_genero": itemFilme.id
                                    };
                                    let res = await controllerFilmeGenero.inserirNovoFilmeGenero(filmeGenero, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.produtora !== undefined) {
                        let resultDeleteProdutoras = await controllerFilmeProdutora.deletarProdutorasIdFilme(filme.id);

                        if (resultDeleteProdutoras.status) {
                            if (filme.produtora.length > 0) {
                                for (let itemProdutora of filme.produtora) {
                                    let filmeProdutora = {
                                        "id_filme": filme.id,
                                        "id_produtora": itemProdutora.id
                                    };
                                    let res = await controllerFilmeProdutora.inserirNovoFilmeProdutora(filmeProdutora, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.idiomas !== undefined) {
                        let resultDeleteIdiomas = await controllerFilmeIdiomas.deletarIdiomasIdFilme(filme.id);

                        if (resultDeleteIdiomas.status) {
                            if (filme.idiomas.length > 0) {
                                for (let itemIdioma of filme.idiomas) {
                                    let filmeIdiomas = {
                                        "id_filme": filme.id,
                                        "id_idiomas": itemIdioma.id,
                                        "original": itemIdioma.original
                                    };
                                    let res = await controllerFilmeIdiomas.inserirNovoFilmeIdiomas(filmeIdiomas, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.imagens !== undefined) {
                        let resultDeleteImagens = await controllerImagens.deletarImagensIdFilme(filme.id);

                        if (resultDeleteImagens.status) {
                            if (filme.imagens.length > 0) {
                                for (let itemImagem of filme.imagens) {
                                    let dadosImagem = {
                                        "imagem": itemImagem.imagem,
                                        "id_tipo_imagem": itemImagem.id_tipo_imagem,
                                        "id_filme": filme.id
                                    };
                                    let res = await controllerImagens.inserirNovaImagem(dadosImagem, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.premios !== undefined) {
                        let resultDeletePremios = await controllerFilmePremio.deletarPremiosIdFilme(filme.id);

                        if (resultDeletePremios.status) {
                            if (filme.premios.length > 0) {
                                for (let itemPremio of filme.premios) {
                                    let filmePremio = {
                                        "id_filme": filme.id,
                                        "id_premio": itemPremio.id
                                    };
                                    let res = await controllerFilmePremio.inserirNovoFilmePremio(filmePremio, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.paises !== undefined) {
                        let resultDeletePaises = await controllerFilmePais.deletarPaisesIdFilme(filme.id);

                        if (resultDeletePaises.status) {
                            if (filme.paises.length > 0) {
                                for (let itemPais of filme.paises) {
                                    let filmePais = {
                                        "id_filme": filme.id,
                                        "id_pais": itemPais.id,
                                        "origem": itemPais.origem
                                    };
                                    let res = await controllerFilmePais.inserirNovoFilmePais(filmePais, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.trailers !== undefined) {
                        let resultDeleteTrailers = await controllerTrailers.deletarTrailersIdFilme(filme.id);

                        if (resultDeleteTrailers.status) {
                            if (filme.trailers.length > 0) {
                                for (let itemTrailer of filme.trailers) {
                                    let dadosTrailer = {
                                        "trailer": itemTrailer.trailer,
                                        "id_filme": filme.id
                                    };
                                    let res = await controllerTrailers.inserirNovoTrailer(dadosTrailer, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.personagens !== undefined) {
                        let resultDeletePersonagens = await controllerFilmePersonagem.deletarPersonagensIdFilme(filme.id);

                        if (resultDeletePersonagens.status) {
                            if (filme.personagens.length > 0) {
                                for (let itemPersonagem of filme.personagens) {
                                    let filmePersonagem = {
                                        "id_filme": filme.id,
                                        "id_personagem": itemPersonagem.id
                                    };
                                    let res = await controllerFilmePersonagem.inserirNovoFilmePersonagem(filmePersonagem, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (filme.participacoes !== undefined) {
                        let resultDeleteParticipacoes = await controllerParticipacao.deletarParticipacoesIdFilme(filme.id);

                        if (resultDeleteParticipacoes.status) {
                            if (filme.participacoes.length > 0) {
                                for (let itemParticipacao of filme.participacoes) {
                                    let participacao = {
                                        "salario": itemParticipacao.salario,
                                        "id_pessoa": itemParticipacao.id_pessoa,
                                        "id_filme": filme.id,
                                        "curiosidades": itemParticipacao.curiosidades,
                                        "atuacoes": itemParticipacao.atuacoes,
                                        "cargos_tecnicos": itemParticipacao.cargos_tecnicos
                                    };
                                    let res = await controllerParticipacao.inserirNovaParticipacao(participacao, contentType);
                                    if (!res.status) erroRelacionamento = true;
                                }
                            }
                        } else {
                            erroRelacionamento = true;
                        }
                    }

                    if (erroRelacionamento) {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM_AVISO(filme);
                    } else {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM(filme);
                    }

                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarFilme;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarFilme = async function () {
    try {
        let result = await filmeDAO.selectAllFilme();

        if (result) {
            if (result.length > 0) {
                for (let filme of result) {

                    let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao);
                    if (resultClassificacao.status == true) {
                        filme.classificacao = resultClassificacao.response.classificacao;
                        delete filme.id_classificacao;
                    }

                    let resultGeneros = await controllerFilmeGenero.buscarGenerosIdFilme(filme.id);
                    if (resultGeneros.status == true) {
                        filme.genero = resultGeneros.response.generos;
                    }

                    let resultProdutoras = await controllerFilmeProdutora.buscarProdutorasIdFilme(filme.id);
                    if (resultProdutoras.status == true) {
                        filme.produtora = resultProdutoras.response.produtoras;
                    }

                    let resultIdiomas = await controllerFilmeIdiomas.buscarIdiomasIdFilme(filme.id);
                    if (resultIdiomas.status == true) {
                        filme.idiomas = resultIdiomas.response.idiomas;
                    }

                    let resultImagens = await controllerImagens.buscarImagensIdFilme(filme.id);
                    if (resultImagens.status == true) {
                        resultImagens.response.imagens.forEach(item => delete item.id_filme);
                        filme.imagens = resultImagens.response.imagens;
                    }

                    let resultPremios = await controllerFilmePremio.buscarPremiosIdFilme(filme.id);
                    if (resultPremios.status == true) {
                        filme.premios = resultPremios.response.premios;
                    }

                    let resultPaises = await controllerFilmePais.buscarPaisesIdFilme(filme.id);
                    if (resultPaises.status == true) {
                        filme.paises = resultPaises.response.paises;
                    }

                    let resultTrailers = await controllerTrailers.buscarTrailersIdFilme(filme.id);
                    if (resultTrailers.status == true) {
                        resultTrailers.response.trailers.forEach(item => delete item.id_filme);
                        filme.trailers = resultTrailers.response.trailers;
                    }

                    let resultPersonagens = await controllerFilmePersonagem.buscarPersonagensIdFilme(filme.id);
                    if (resultPersonagens.status == true) {
                        filme.personagens = resultPersonagens.response.personagens;
                    }

                    let resultElenco = await controllerParticipacao.buscarElencoIdFilme(filme.id);
                    if (resultElenco.status == true) {
                        filme.elenco = resultElenco.response.elenco;
                    }

                    let resultParticipacoes = await controllerParticipacao.buscarParticipacoesIdFilme(filme.id);
                    if (resultParticipacoes.status == true) {
                        let equipeTecnica = [];

                        for (let participacao of resultParticipacoes.response.participacoes) {
                            if (participacao.cargos_tecnicos && participacao.cargos_tecnicos.length > 0) {
                                let cargosLimpos = [];
                                for (let cargo of participacao.cargos_tecnicos) {
                                    cargosLimpos.push({
                                        id: cargo.id,
                                        nome: cargo.nome,
                                        descricao: cargo.descricao
                                    });
                                }

                                let idParticipacao;
                                if (participacao.id_participacao) {
                                    idParticipacao = participacao.id_participacao;
                                } else {
                                    idParticipacao = participacao.id;
                                }

                                let listaCuriosidades = [];
                                if (participacao.curiosidades) {
                                    listaCuriosidades = participacao.curiosidades;
                                }

                                let tecnicoLimpo = {
                                    participacao: {
                                        id: idParticipacao,
                                        salario: participacao.salario,
                                        curiosidades: listaCuriosidades
                                    },
                                    pessoa: {
                                        id: participacao.id_pessoa,
                                        nome: participacao.nome_nascimento
                                    },
                                    cargos_tecnicos: cargosLimpos
                                };

                                equipeTecnica.push(tecnicoLimpo);
                            }
                        }

                        if (equipeTecnica.length > 0) {
                            filme.equipe_tecnica = equipeTecnica;
                        }
                    }
                }

                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme");
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

const buscarFilme = async function (id) {
    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {

            let result = await filmeDAO.selectByIdFilme(id);

            if (result) {
                if (result.length > 0) {

                    for (let filme of result) {

                        let resultClassificacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao);
                        if (resultClassificacao.status == true) {
                            filme.classificacao = resultClassificacao.response.classificacao;
                            delete filme.id_classificacao;
                        }

                        let resultGeneros = await controllerFilmeGenero.buscarGenerosIdFilme(filme.id);
                        if (resultGeneros.status == true) {
                            filme.genero = resultGeneros.response.generos;
                        }

                        let resultProdutoras = await controllerFilmeProdutora.buscarProdutorasIdFilme(filme.id);
                        if (resultProdutoras.status == true) {
                            filme.produtora = resultProdutoras.response.produtoras;
                        }

                        let resultIdiomas = await controllerFilmeIdiomas.buscarIdiomasIdFilme(filme.id);
                        if (resultIdiomas.status == true) {
                            filme.idiomas = resultIdiomas.response.idiomas;
                        }

                        let resultImagens = await controllerImagens.buscarImagensIdFilme(filme.id);
                        if (resultImagens.status == true) {
                            resultImagens.response.imagens.forEach(item => delete item.id_filme);
                            filme.imagens = resultImagens.response.imagens;
                        }

                        let resultPremios = await controllerFilmePremio.buscarPremiosIdFilme(filme.id);
                        if (resultPremios.status == true) {
                            filme.premios = resultPremios.response.premios;
                        }

                        let resultPaises = await controllerFilmePais.buscarPaisesIdFilme(filme.id);
                        if (resultPaises.status == true) {
                            filme.paises = resultPaises.response.paises;
                        }

                        let resultTrailers = await controllerTrailers.buscarTrailersIdFilme(filme.id);
                        if (resultTrailers.status == true) {
                            resultTrailers.response.trailers.forEach(item => delete item.id_filme);
                            filme.trailers = resultTrailers.response.trailers;
                        }

                        let resultPersonagens = await controllerFilmePersonagem.buscarPersonagensIdFilme(filme.id);
                        if (resultPersonagens.status == true) {
                            filme.personagens = resultPersonagens.response.personagens;
                        }

                        let resultElenco = await controllerParticipacao.buscarElencoIdFilme(filme.id);
                        if (resultElenco.status == true) {
                            filme.elenco = resultElenco.response.elenco;
                        }

                        let resultParticipacoes = await controllerParticipacao.buscarParticipacoesIdFilme(filme.id);
                        if (resultParticipacoes.status == true) {
                            let equipeTecnica = [];

                            for (let participacao of resultParticipacoes.response.participacoes) {
                                if (participacao.cargos_tecnicos && participacao.cargos_tecnicos.length > 0) {

                                    let cargosLimpos = [];
                                    for (let cargo of participacao.cargos_tecnicos) {
                                        cargosLimpos.push({
                                            id: cargo.id,
                                            nome: cargo.nome,
                                            descricao: cargo.descricao
                                        });
                                    }

                                    let idParticipacao;
                                    if (participacao.id_participacao) {
                                        idParticipacao = participacao.id_participacao;
                                    } else {
                                        idParticipacao = participacao.id;
                                    }

                                    let listaCuriosidades = [];
                                    if (participacao.curiosidades) {
                                        listaCuriosidades = participacao.curiosidades;
                                    }

                                    let tecnicoLimpo = {
                                        participacao: {
                                            id: idParticipacao,
                                            salario: participacao.salario,
                                            curiosidades: listaCuriosidades
                                        },
                                        pessoa: {
                                            id: participacao.id_pessoa,
                                            nome: participacao.nome_nascimento
                                        },
                                        cargos_tecnicos: cargosLimpos
                                    };

                                    equipeTecnica.push(tecnicoLimpo);
                                }
                            }

                            if (equipeTecnica.length > 0) {
                                filme.equipe_tecnica = equipeTecnica;
                            }
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "filme");
                } else {
                    return mensagem.ERRO_NADA_ENCONTRADO();
                }
            } else {
                return mensagem.ERRO_MODEL();
            };
        } else {
            return resultValidarId;
        };

    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    };
};

const excluirFilme = async function (id) {

    try {
        let resultBuscarFilme = await buscarFilme(id);

        if (resultBuscarFilme.status) {
            let result = await filmeDAO.deleteFilme(id);

            if (result) {
                return mensagem.SUCESSO_DELETAR_ITEM();
            } else {
                return mensagem.ERRO_MODEL();
            };

        } else {
            return resultBuscarFilme;
        };
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    };
};

module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
};