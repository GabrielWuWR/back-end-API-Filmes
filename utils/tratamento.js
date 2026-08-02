const tratar = {
    /**
     * Trata os dados e mantém apenas os campos permitidos.
     *
     * @param {Object} dados
     * @param {Array<string>} camposPermitidos
     * @returns {Object}
     */
    DADOS: function (dados, camposPermitidos = null) {

        let novoObjeto = {};

        for (let campo in dados) {
            if (
                camposPermitidos &&
                !camposPermitidos.includes(campo)
            ) {
                continue;
            }

            let valor = dados[campo];

            if (typeof valor === "string") {
                valor = valor.replaceAll("'", "’");
            }

            novoObjeto[campo] = valor;
        }

        return novoObjeto;
    }
};

module.exports = {
    tratar
};