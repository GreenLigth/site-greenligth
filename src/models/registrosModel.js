var database = require("../database/config");

function buscarRegistros(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            r.dataLeitura,
            r.luminosidade,

            CASE
                WHEN r.luminosidade > 200 AND r.luminosidade >= 300 THEN 'muito-alta'
                WHEN r.luminosidade > 170 AND r.luminosidade >= 200 THEN 'alta'
                WHEN r.luminosidade > 140 AND r.luminosidade <= 170 THEN 'ideal'
                ELSE 'baixa'
            END AS status,

            s.codigoSensor,
            s.corredor,
            s.bloco,
            e.nomeEstufa

        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa

        WHERE e.fkEmpresa = ${fkEmpresa}

        ORDER BY r.dataLeitura DESC;
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarRegistros
};