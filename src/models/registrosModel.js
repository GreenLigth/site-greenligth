var database = require("../database/config");

function buscarRegistros(idEmpresa) {
    var instrucaoSql = `
        SELECT 
            r.dataLeitura,
            r.luminosidade,
            s.codigoSensor,
            s.corredor,
            s.bloco,
            e.nomeEstufa
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${idEmpresa}
        ORDER BY r.dataLeitura DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarRegistros
};