const express = require('express');
const router = express.Router();

const controllerSetor = require('../../controller/setor/controller_setor.js');

router.post('/', async function (request, response) {
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerSetor.inserirNovoSetor(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerSetor.listarTodosSetores();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerSetor.buscarSetor(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let dados = request.body;
    let id = request.params.id;
    let contentType = request.headers['content-type'];

    let result = await controllerSetor.atualizarSetor(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerSetor.deletarSetor(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;