const express = require('express');
const router = express.Router();

const controllerPessoa = require('../../controller/pessoa/controller_pessoa.js');

router.post('/', async function (request, response) {
    let dados = request.body;
    let contentType = request.headers['content-type'];

    let result = await controllerPessoa.inserirNovaPessoa(dados, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.get('/', async function (request, response) {
    let result = await controllerPessoa.listarTodasPessoas();

    response.status(result.status_code);
    response.json(result);
});

router.get('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerPessoa.buscarPessoa(id);

    response.status(result.status_code);
    response.json(result);
});

router.put('/:id', async function (request, response) {
    let dados = request.body;
    let id = request.params.id;
    let contentType = request.headers['content-type'];

    let result = await controllerPessoa.atualizarPessoa(dados, id, contentType);

    response.status(result.status_code);
    response.json(result);
});

router.delete('/:id', async function (request, response) {
    let id = request.params.id;

    let result = await controllerPessoa.deletarPessoa(id);

    response.status(result.status_code);
    response.json(result);
});

module.exports = router;