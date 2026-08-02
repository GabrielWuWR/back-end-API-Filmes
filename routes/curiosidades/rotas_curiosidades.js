const express = require('express');
const router = express.Router();

const controllerCuriosidades = require('../../controller/curiosidades/controller_curiosidades.js');

router.post('/', async function (request, response) {
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerCuriosidades.inserirNovaCuriosidade(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerCuriosidades.listarTodasCuriosidades();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerCuriosidades.buscarCuriosidade(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let dados = request.body;
    let id = request.params.id;
    let contentType = request.headers['content-type'];

    let result = await controllerCuriosidades.atualizarCuriosidade(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerCuriosidades.deletarCuriosidade(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;