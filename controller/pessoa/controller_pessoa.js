const { mensagem } = require('../modulo/configMessages.js');
const pessoaDAO = require('../../model/DAO/pessoa/pessoa.js');

const controllerSexo = require('../sexo/controller_sexo.js');
const controllerPessoaCuriosidades = require('./controller_pessoa_curiosidades.js');
const controllerPessoaPremio = require('./controller_pessoa_premio.js');
const controllerPessoaPaisOrigem = require('./controller_pessoa_pais_origem.js');
const controllerPessoaOcupacao = require('./controller_pessoa_ocupacoes.js');
const controllerFotoPessoa = require('../foto_pessoa/controller_foto_pessoa.js');
const controllerNomeArtistico = require('../nome_artistico/controller_nome_artistico.js');

const { validar } = require('../../utils/validador.js');
const { tratar } = require('../../utils/tratamento.js');

const regras = {
    nome_nascimento: { necessario: true, minimo: 1, maximo: 256, tipo: "string" },
    data_nascimento: { necessario: true, minimo: 10, maximo: 10, tipo: "string" },
    data_falecimento: { necessario: false, tipo: "string" },
    ano_inicio_carreira: { necessario: false, tipo: "string" },
    biografia: { necessario: false, tipo: "string" },
    altura: { necessario: false, tipo: "number" },
    cidade_natal: { necessario: false, maximo: 150, tipo: "string" },
    id_sexo: { necessario: true, tipo: "number" }
};

const inserirNovaPessoa = async function (pessoa, contentType) {
    try {
        let resultValidar = validar.DADOS(pessoa, regras, contentType);

        if (resultValidar == false) {
            let dadosPessoa = tratar.DADOS(pessoa, [
                "nome_nascimento",
                "data_nascimento",
                "data_falecimento",
                "ano_inicio_carreira",
                "biografia",
                "altura",
                "cidade_natal",
                "id_sexo"
            ]);

            let result = await pessoaDAO.insertPessoa(dadosPessoa);

            if (result) {
                pessoa.id = result;
                
                let avisos = [];

                if (pessoa.curiosidades && pessoa.curiosidades.length > 0) {
                    for (let itemCuriosidade of pessoa.curiosidades) {
                        let pessoaCuriosidade = {
                            "id_pessoa": pessoa.id,
                            "id_curiosidades": itemCuriosidade.id
                        };
                        let resultCuriosidade = await controllerPessoaCuriosidades.inserirNovaPessoaCuriosidade(pessoaCuriosidade, contentType);

                        if (!resultCuriosidade.status) {
                            avisos.push({
                                entidade: "curiosidade",
                                dados: pessoaCuriosidade,
                                erro: resultCuriosidade.message
                            });
                        }
                    }
                }

                if (pessoa.premios && pessoa.premios.length > 0) {
                    for (let itemPremio of pessoa.premios) {
                        let pessoaPremio = {
                            "id_pessoa": pessoa.id,
                            "id_premio": itemPremio.id
                        };
                        let resultPremio = await controllerPessoaPremio.inserirNovaPessoaPremio(pessoaPremio, contentType);

                        if (!resultPremio.status) {
                            avisos.push({
                                entidade: "premio",
                                dados: pessoaPremio,
                                erro: resultPremio.message
                            });
                        }
                    }
                }

                if (pessoa.paises_origem && pessoa.paises_origem.length > 0) {
                    for (let itemPais of pessoa.paises_origem) {
                        let pessoaPais = {
                            "id_pessoa": pessoa.id,
                            "id_pais": itemPais.id
                        };
                        let resultPais = await controllerPessoaPaisOrigem.inserirNovaPessoaPaisOrigem(pessoaPais, contentType);

                        if (!resultPais.status) {
                            avisos.push({
                                entidade: "pais_origem",
                                dados: pessoaPais,
                                erro: resultPais.message
                            });
                        }
                    }
                }

                if (pessoa.ocupacoes && pessoa.ocupacoes.length > 0) {
                    for (let itemOcupacao of pessoa.ocupacoes) {
                        let pessoaOcupacao = {
                            "id_pessoa": pessoa.id,
                            "id_ocupacoes": itemOcupacao.id
                        };
                        let resultOcupacao = await controllerPessoaOcupacao.inserirNovaPessoaOcupacao(pessoaOcupacao, contentType);

                        if (!resultOcupacao.status) {
                            avisos.push({
                                entidade: "ocupacao",
                                dados: pessoaOcupacao,
                                erro: resultOcupacao.message
                            });
                        }
                    }
                }

                if (pessoa.fotos && pessoa.fotos.length > 0) {
                    for (let itemFoto of pessoa.fotos) {
                        let fotoPessoa = {
                            "foto": itemFoto.foto,
                            "id_pessoa": pessoa.id
                        };
                        let resultFoto = await controllerFotoPessoa.inserirNovaFotoPessoa(fotoPessoa, contentType);

                        if (!resultFoto.status) {
                            avisos.push({
                                entidade: "foto",
                                dados: fotoPessoa,
                                erro: resultFoto.message
                            });
                        }
                    }
                }

                if (pessoa.nomes_artisticos && pessoa.nomes_artisticos.length > 0) {
                    for (let itemNome of pessoa.nomes_artisticos) {
                        let nomeArtistico = {
                            "nome": itemNome.nome,
                            "id_pessoa": pessoa.id
                        };
                        let resultNome = await controllerNomeArtistico.inserirNovoNomeArtistico(nomeArtistico, contentType);

                        if (!resultNome.status) {
                            avisos.push({
                                entidade: "nome_artistico",
                                dados: nomeArtistico,
                                erro: resultNome.message
                            });
                        }
                    }
                }

                if (avisos.length > 0) {
                    return mensagem.SUCESSO_CRIAR_ITEM_AVISO(pessoa, avisos);
                } else {
                    return mensagem.SUCESSO_CRIAR_ITEM(pessoa);
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

const atualizarPessoa = async function (pessoa, id, contentType) {
    try {
        let resultValidar = validar.DADOS(pessoa, regras, contentType);

        if (resultValidar == false) {
            let resultBuscarPessoa = await buscarPessoa(id);

            if (resultBuscarPessoa.status == true) {
                pessoa.id = Number(id);

                let dadosPessoa = tratar.DADOS(pessoa, [
                    "id",
                    "nome_nascimento",
                    "data_nascimento",
                    "data_falecimento",
                    "ano_inicio_carreira",
                    "ano_fim_carreira",
                    "biografia",
                    "altura",
                    "cidade_natal",
                    "id_sexo"
                ]);

                let result = await pessoaDAO.updatePessoa(dadosPessoa);

                if (result) {
                    let avisos = [];

                    if (pessoa.curiosidades !== undefined) {
                        let resultDeleteCuriosidades = await controllerPessoaCuriosidades.deletarCuriosidadesIdPessoa(pessoa.id);

                        if (resultDeleteCuriosidades.status) {
                            if (pessoa.curiosidades.length > 0) {
                                for (let itemCuriosidade of pessoa.curiosidades) {
                                    let pessoaCuriosidade = {
                                        "id_pessoa": pessoa.id,
                                        "id_curiosidades": itemCuriosidade.id
                                    };
                                    let res = await controllerPessoaCuriosidades.inserirNovaPessoaCuriosidade(pessoaCuriosidade, contentType);
                                    if (!res.status) {
                                        avisos.push({ entidade: "curiosidade", acao: "inserir", dados: pessoaCuriosidade, erro: res.message });
                                    }
                                }
                            }
                        } else {
                            avisos.push({ entidade: "curiosidade", acao: "deletar", erro: resultDeleteCuriosidades.message });
                        }
                    }

                    if (pessoa.premios !== undefined) {
                        let resultDeletePremios = await controllerPessoaPremio.deletarPremiosIdPessoa(pessoa.id);

                        if (resultDeletePremios.status) {
                            if (pessoa.premios.length > 0) {
                                for (let itemPremio of pessoa.premios) {
                                    let pessoaPremio = {
                                        "id_pessoa": pessoa.id,
                                        "id_premio": itemPremio.id
                                    };
                                    let res = await controllerPessoaPremio.inserirNovaPessoaPremio(pessoaPremio, contentType);
                                    if (!res.status) {
                                        avisos.push({ entidade: "premio", acao: "inserir", dados: pessoaPremio, erro: res.message });
                                    }
                                }
                            }
                        } else {
                            avisos.push({ entidade: "premio", acao: "deletar", erro: resultDeletePremios.message });
                        }
                    }

                    if (pessoa.paises_origem !== undefined) {
                        let resultDeletePaises = await controllerPessoaPaisOrigem.deletarPaisesIdPessoa(pessoa.id);

                        if (resultDeletePaises.status) {
                            if (pessoa.paises_origem.length > 0) {
                                for (let itemPais of pessoa.paises_origem) {
                                    let pessoaPais = {
                                        "id_pessoa": pessoa.id,
                                        "id_pais": itemPais.id
                                    };
                                    let res = await controllerPessoaPaisOrigem.inserirNovaPessoaPaisOrigem(pessoaPais, contentType);
                                    if (!res.status) {
                                        avisos.push({ entidade: "pais_origem", acao: "inserir", dados: pessoaPais, erro: res.message });
                                    }
                                }
                            }
                        } else {
                            avisos.push({ entidade: "pais_origem", acao: "deletar", erro: resultDeletePaises.message });
                        }
                    }

                    if (pessoa.ocupacoes !== undefined) {
                        let resultDeleteOcupacoes = await controllerPessoaOcupacao.deletarOcupacoesIdPessoa(pessoa.id);

                        if (resultDeleteOcupacoes.status) {
                            if (pessoa.ocupacoes.length > 0) {
                                for (let itemOcupacao of pessoa.ocupacoes) {
                                    let pessoaOcupacao = {
                                        "id_pessoa": pessoa.id,
                                        "id_ocupacoes": itemOcupacao.id
                                    };
                                    let res = await controllerPessoaOcupacao.inserirNovaPessoaOcupacao(pessoaOcupacao, contentType);
                                    if (!res.status) {
                                        avisos.push({ entidade: "ocupacao", acao: "inserir", dados: pessoaOcupacao, erro: res.message });
                                    }
                                }
                            }
                        } else {
                            avisos.push({ entidade: "ocupacao", acao: "deletar", erro: resultDeleteOcupacoes.message });
                        }
                    }

                    if (pessoa.fotos !== undefined) {
                        let resultDeleteFotos = await controllerFotoPessoa.deletarFotosIdPessoa(pessoa.id);

                        if (resultDeleteFotos.status) {
                            if (pessoa.fotos.length > 0) {
                                for (let itemFoto of pessoa.fotos) {
                                    let fotoPessoa = {
                                        "foto": itemFoto.foto,
                                        "id_pessoa": pessoa.id
                                    };
                                    let res = await controllerFotoPessoa.inserirNovaFotoPessoa(fotoPessoa, contentType);
                                    if (!res.status) {
                                        avisos.push({ entidade: "foto", acao: "inserir", dados: fotoPessoa, erro: res.message });
                                    }
                                }
                            }
                        } else {
                            avisos.push({ entidade: "foto", acao: "deletar", erro: resultDeleteFotos.message });
                        }
                    }

                    if (pessoa.nomes_artisticos !== undefined) {
                        let resultDeleteNomes = await controllerNomeArtistico.deletarNomesIdPessoa(pessoa.id);

                        if (resultDeleteNomes.status) {
                            if (pessoa.nomes_artisticos.length > 0) {
                                for (let itemNome of pessoa.nomes_artisticos) {
                                    let nomeArtistico = {
                                        "nome": itemNome.nome,
                                        "id_pessoa": pessoa.id
                                    };
                                    let res = await controllerNomeArtistico.inserirNovoNomeArtistico(nomeArtistico, contentType);
                                    if (!res.status) {
                                        avisos.push({ entidade: "nome_artistico", acao: "inserir", dados: nomeArtistico, erro: res.message });
                                    }
                                }
                            }
                        } else {
                            avisos.push({ entidade: "nome_artistico", acao: "deletar", erro: resultDeleteNomes.message });
                        }
                    }

                    if (avisos.length > 0) {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM_AVISO(pessoa, avisos);
                    } else {
                        return mensagem.SUCESSO_ATUALIZAR_ITEM(pessoa);
                    }
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultBuscarPessoa;
            }
        } else {
            return resultValidar;
        }
    } catch (error) {
        console.log(error)
        return mensagem.ERRO_CONTROLLER();
    }
};

const listarTodasPessoas = async function () {
    try {
        let result = await pessoaDAO.selectAllPessoas();

        if (result) {
            if (result.length > 0) {
                for (let pessoa of result) {

                    let resultSexo = await controllerSexo.buscarSexo(pessoa.id_sexo);

                    if (resultSexo.status == true) {
                        pessoa.sexo = resultSexo.response.sexo;
                        delete pessoa.id_sexo;
                    }

                    let resultCuriosidades = await controllerPessoaCuriosidades.buscarCuriosidadesIdPessoa(pessoa.id);
                    if (resultCuriosidades.status == true) {
                        pessoa.curiosidades = resultCuriosidades.response.curiosidades;
                    }

                    let resultPremios = await controllerPessoaPremio.buscarPremiosIdPessoa(pessoa.id);
                    if (resultPremios.status == true) {
                        pessoa.premios = resultPremios.response.premios;
                    }

                    let resultPaisesOrigem = await controllerPessoaPaisOrigem.buscarPaisesIdPessoa(pessoa.id);
                    if (resultPaisesOrigem.status == true) {
                        pessoa.paises_origem = resultPaisesOrigem.response.paises;
                    }

                    let resultOcupacoes = await controllerPessoaOcupacao.buscarOcupacoesIdPessoa(pessoa.id);
                    if (resultOcupacoes.status == true) {
                        pessoa.ocupacoes = resultOcupacoes.response.ocupacoes;
                    }

                    let resultFotos = await controllerFotoPessoa.buscarFotosIdPessoa(pessoa.id);
                    if (resultFotos.status == true) {
                        for (let foto of resultFotos.response.fotos) {
                            delete foto.id_pessoa;
                        }
                        pessoa.fotos = resultFotos.response.fotos;
                    }

                    let resultNomesArtisticos = await controllerNomeArtistico.buscarNomesIdPessoa(pessoa.id);
                    if (resultNomesArtisticos.status == true) {
                        for (let nome of resultNomesArtisticos.response.nomes_artisticos) {
                            delete nome.id_pessoa;
                        }
                        pessoa.nomes_artisticos = resultNomesArtisticos.response.nomes_artisticos;
                    }
                }

                return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoas");
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

const buscarPessoa = async function (id) {
    try {
        let resultValidarId = validar.ID(id);

        if (resultValidarId == false) {
            let result = await pessoaDAO.selectByIdPessoa(id);

            if (result) {
                if (result.length > 0) {

                    for (let pessoa of result) {
                        let resultSexo = await controllerSexo.buscarSexo(pessoa.id_sexo);

                        if (resultSexo.status == true) {
                            pessoa.sexo = resultSexo.response.sexo;
                            delete pessoa.id_sexo;
                        }

                        let resultCuriosidades = await controllerPessoaCuriosidades.buscarCuriosidadesIdPessoa(pessoa.id);
                        if (resultCuriosidades.status == true) {
                            pessoa.curiosidades = resultCuriosidades.response.curiosidades;
                        }

                        let resultPremios = await controllerPessoaPremio.buscarPremiosIdPessoa(pessoa.id);
                        if (resultPremios.status == true) {
                            pessoa.premios = resultPremios.response.premios;
                        }

                        let resultPaisesOrigem = await controllerPessoaPaisOrigem.buscarPaisesIdPessoa(pessoa.id);
                        if (resultPaisesOrigem.status == true) {
                            pessoa.paises_origem = resultPaisesOrigem.response.paises;
                        }

                        let resultOcupacoes = await controllerPessoaOcupacao.buscarOcupacoesIdPessoa(pessoa.id);
                        if (resultOcupacoes.status == true) {
                            pessoa.ocupacoes = resultOcupacoes.response.ocupacoes;
                        }

                        let resultFotos = await controllerFotoPessoa.buscarFotosIdPessoa(pessoa.id);
                        if (resultFotos.status == true) {
                            for (let foto of resultFotos.response.fotos) {
                                delete foto.id_pessoa;
                            }
                            pessoa.fotos = resultFotos.response.fotos;
                        }

                        let resultNomesArtisticos = await controllerNomeArtistico.buscarNomesIdPessoa(pessoa.id);
                        if (resultNomesArtisticos.status == true) {
                            for (let nome of resultNomesArtisticos.response.nomes_artisticos) {
                                delete nome.id_pessoa;
                            }
                            pessoa.nomes_artisticos = resultNomesArtisticos.response.nomes_artisticos;
                        }
                    }

                    return mensagem.RETORNAR_ITENS_ENCONTRADOS(result, "pessoa");
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

const deletarPessoa = async function (id) {
    try {
        let resultBuscarPessoa = await buscarPessoa(id);

        if (resultBuscarPessoa.status) {
            let resultValidarId = validar.ID(id);

            if (resultValidarId == false) {
                let result = await pessoaDAO.deletePessoa(id);

                if (result) {
                    return mensagem.SUCESSO_DELETAR_ITEM();
                } else {
                    return mensagem.ERRO_MODEL();
                }
            } else {
                return resultValidarId;
            }
        } else {
            return resultBuscarPessoa;
        }
    } catch (error) {
        return mensagem.ERRO_CONTROLLER();
    }
};

module.exports = {
    inserirNovaPessoa,
    atualizarPessoa,
    listarTodasPessoas,
    buscarPessoa,
    deletarPessoa
};