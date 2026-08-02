const express = require('express');
const router = express.Router();

const controllerOcupacoes = require('../../controller/ocupacoes/controller_ocupacoes.js');

router.post('/', async function (request, response) {
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerOcupacoes.inserirNovaOcupacao(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerOcupacoes.listarTodasOcupacoes();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerOcupacoes.buscarOcupacao(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let dados = request.body;
    let id = request.params.id;
    let contentType = request.headers['content-type'];

    let result = await controllerOcupacoes.atualizarOcupacao(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerOcupacoes.deletarOcupacao(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;