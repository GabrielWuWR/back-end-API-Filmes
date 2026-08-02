const express = require('express');
const router = express.Router();

const controllerTipoAtuacao = require('../../controller/tipo_atuacao/controller_tipo_atuacao.js');

router.post('/', async function (request, response) {
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerTipoAtuacao.inserirNovoTipoAtuacao(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerTipoAtuacao.listarTodosTiposAtuacao();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerTipoAtuacao.buscarTipoAtuacao(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let dados = request.body;
    let id = request.params.id;
    let contentType = request.headers['content-type'];

    let result = await controllerTipoAtuacao.atualizarTipoAtuacao(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerTipoAtuacao.deletarTipoAtuacao(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;