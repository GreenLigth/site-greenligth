var database = require("../database/config")

function listarRegistros(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            r.idRegistro,
            r.luminosidade,
            r.dataLeitura,
            s.codigoSensor,
            s.corredor,
            s.bloco,
            e.nomeEstufa
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        ORDER BY r.dataLeitura DESC;
    `

    return database.executar(instrucaoSql)
}

function maiorPico(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            MAX(r.luminosidade) AS maiorLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa
        ORDER BY maiorLuz DESC
        LIMIT 1;
    `

    return database.executar(instrucaoSql)
}

function mediaLuzMensal(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            ROUND(AVG(r.luminosidade), 0) AS mediaLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW());
    `

    return database.executar(instrucaoSql)
}

function contagemStatus(fkEmpresa) {
    var instrucaoSql = `
        SELECT 
            CASE
                WHEN r.luminosidade > 200 AND r.luminosidade <= 300 THEN 'muito-alta'
                WHEN r.luminosidade > 170 AND r.luminosidade <= 200 THEN 'alta'
                WHEN r.luminosidade > 140 AND r.luminosidade <= 170 THEN 'ideal'
                ELSE 'baixa'
            END AS status,
            COUNT(*) AS quantidade
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY status;
    `

    return database.executar(instrucaoSql)
}

function mediaMensalPorMes(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            MONTH(r.dataLeitura) AS mes,
            ROUND(AVG(r.luminosidade), 0) AS mediaLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY mes
        ORDER BY mes;
    `

    return database.executar(instrucaoSql)
}

function sensoresEmAlertaPorEstufa(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            COUNT(DISTINCT s.idSensor) AS qtdAlerta
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND r.luminosidade > 200
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa;
    `

    return database.executar(instrucaoSql)
}
function totalSensores(fkEmpresa) {

    var instrucaoSql = `
        SELECT COUNT(*) AS total
        FROM sensor s
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa};
    `
    return database.executar(instrucaoSql)
}

module.exports = {
    listarRegistros,
    maiorPico,
    mediaLuzMensal,
    contagemStatus,
    mediaMensalPorMes,
    sensoresEmAlertaPorEstufa,
    totalSensores
}