var database = require("../database/config")



function listarRegistros() {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarRegistros()");
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
        ORDER BY r.dataLeitura DESC
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function maiorPico() {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maiorPico()");
    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            MAX(r.luminosidade) AS maiorLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa
        ORDER BY maiorLuz DESC
        LIMIT 1
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function mediaLuzMensal() {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mediaLuzMensal()");
    var instrucaoSql = `
        SELECT 
            ROUND(AVG(r.luminosidade), 0) AS mediaLuz
        FROM registroLuminosidade r
        WHERE MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW())
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function contagemStatus() {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contagemStatus()");
    var instrucaoSql = `
        SELECT 
        CASE
            WHEN r.luminosidade > 30000 THEN 'muito-alta'
            WHEN r.luminosidade BETWEEN 20000 AND 30000 THEN 'alta'
            WHEN r.luminosidade BETWEEN 8000 AND 20000 THEN 'ideal'
            ELSE 'baixa'
        END AS status,
        COUNT(*) AS quantidade
        FROM registroLuminosidade r
        WHERE MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY status
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function mediaMensalPorMes() {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mediaMensalPorMes()");
    var instrucaoSql = `
        SELECT 
            MONTH(r.dataLeitura) AS mes,
            ROUND(AVG(r.luminosidade), 0) AS mediaLuz
        FROM registroLuminosidade r
        WHERE YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY mes
        ORDER BY mes
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function sensoresEmAlertaPorEstufa() {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function sensoresEmAlertaPorEstufa()");
    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            COUNT(DISTINCT s.idSensor) AS qtdAlerta
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE r.luminosidade > 30000
          AND MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

function totalSensores() {
    console.log("ACESSEI O REGISTRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function totalSensores()");
    var instrucaoSql = `
        SELECT COUNT(*) AS total FROM sensor
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
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
