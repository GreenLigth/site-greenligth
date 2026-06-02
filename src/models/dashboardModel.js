var database = require("../database/config")


function maiorPico(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            MAX(r.luminosidade) AS maiorLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND DAY(r.dataLeitura) = DAY(NOW())
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa
        ORDER BY maiorLuz DESC
        LIMIT 1;
    `

    return database.executar(instrucaoSql)
}

function menorPico(fkEmpresa) {

    var instrucaoSql = `
       SELECT 
            e.nomeEstufa,
            MIN(r.luminosidade) AS menorLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND DAY(r.dataLeitura) = DAY(NOW())
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa
        ORDER BY menorLuz ASC
        LIMIT 1;
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
        AND DAY(r.dataLeitura) = DAY(NOW())
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY status
        LIMIT 10;
    `

    return database.executar(instrucaoSql)
}

function registroLeituraHoras(fkEmpresa) {

    var instrucaoSql = `
      SELECT 
            HOUR(r.dataLeitura) AS hora,
            r.luminosidade AS luminosidade
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND DAY(r.dataLeitura) = DAY(NOW())
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        ORDER BY r.dataLeitura
        LIMIT 24;
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
        AND DAY(r.dataLeitura) = DAY(NOW())
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
    maiorPico,
    menorPico,
    contagemStatus,
    registroLeituraHoras,
    sensoresEmAlertaPorEstufa,
    totalSensores
}