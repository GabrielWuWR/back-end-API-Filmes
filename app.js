const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const rotaBase = '/v1/senai/locadora/';
const porta = 8080;
const app = express();

const corsOptions = {
    origin: ['*'],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: ['Content-type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

//ROTAS

const rotasClassificacao = require('./routes/classificacao/rotas_classificacao.js');
app.use(`${rotaBase}classificacao`, rotasClassificacao);

const rotasGenero = require('./routes/genero/rotas_genero.js');
app.use(`${rotaBase}genero`, rotasGenero);

const rotasStatusFilme = require('./routes/statusFilme/rotas_statusFilme.js');
app.use(`${rotaBase}statusFilme`, rotasStatusFilme);

const rotasTipoImagem = require('./routes/tipoImagem/rotas_tipoImagem.js');
app.use(`${rotaBase}tipoImagem`, rotasTipoImagem);

const rotasProdutora = require('./routes/produtora/rotas_produtora.js');
app.use(`${rotaBase}produtora`, rotasProdutora);

const rotasIdioma = require('./routes/idiomas/rotas_idioma.js');
app.use(`${rotaBase}idioma`, rotasIdioma);

const rotasPais = require('./routes/pais/rotas_pais.js');
app.use(`${rotaBase}pais`, rotasPais);

const rotasPremio = require('./routes/premio/rotas_premio.js');
app.use(`${rotaBase}premio`, rotasPremio);

const rotasFilme = require('./routes/filme/rotas_filme.js');
app.use(`${rotaBase}filme`, rotasFilme);

const rotasPersonagem = require('./routes/personagem/rotas_pesonagem.js');
app.use(`${rotaBase}personagem`, rotasPersonagem);

const rotasSexo = require('./routes/sexo/rotas_sexo.js');
app.use(`${rotaBase}sexo`, rotasSexo);

const rotasCuriosidades = require('./routes/curiosidades/rotas_curiosidades.js');
app.use(`${rotaBase}curiosidades`, rotasCuriosidades);

const rotasSetor = require('./routes/setor/rotas_setor.js');
app.use(`${rotaBase}setor`, rotasSetor);

const rotasOcupacoes = require('./routes/ocupacoes/rotas_ocupacoes.js');
app.use(`${rotaBase}ocupacoes`, rotasOcupacoes);

const rotasTipoAtuacao = require('./routes/tipo_atuacao/rotas_tipo_atuacao.js');
app.use(`${rotaBase}tipoAtuacao`, rotasTipoAtuacao);

const rotasPessoa = require('./routes/pessoa/rotas_pessoa.js');
app.use(`${rotaBase}pessoa`, rotasPessoa);

app.listen(porta, function () {
    console.log(`A api está funcioando em http://localhost:${porta}`);
});