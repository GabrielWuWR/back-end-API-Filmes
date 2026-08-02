const express = require('express');
const router = express.Router();

const controllerPersonagem = require('../../controller/personagem/controller_personagem.js');

router.post('/', async function (request, response) {
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerPersonagem.inserirNovoPersonagem(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerPersonagem.listarTodosPersonagens();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerPersonagem.buscarPersonagem(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let dados = request.body;
    let id = request.params.id;
    let contentType = request.headers['content-type'];

    let result = await controllerPersonagem.atualizarPersonagem(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerPersonagem.deletarPersonagem(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;