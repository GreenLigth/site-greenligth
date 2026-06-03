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

function alertasPorEstufa(fkEmpresa) {
    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            COUNT(*) AS qtdAlertas
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND (r.luminosidade > 200 OR r.luminosidade < 140)
        AND DAY(r.dataLeitura) = DAY(NOW())
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa
        ORDER BY qtdAlertas DESC;
    `

    return database.executar(instrucaoSql)
}

function registroLeituraHoras(fkEmpresa) {

    var instrucaoSql = `
        SELECT 
            HOUR(r.dataLeitura) AS hora,
            ROUND(AVG(r.luminosidade), 0) AS luminosidade
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND DAY(r.dataLeitura) = DAY(NOW())
        AND MONTH(r.dataLeitura) = MONTH(NOW())
        AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY HOUR(r.dataLeitura)
        ORDER BY hora;
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
    alertasPorEstufa,
    registroLeituraHoras,
    sensoresEmAlertaPorEstufa,
    totalSensores
}