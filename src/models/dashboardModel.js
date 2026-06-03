var database = require("../database/config")

// Função para injetar dinamicamente as condições de Data e Busca mantendo a lógica diária por padrão
function aplicarFiltros(data, estufa) {
    var sqlFiltro = "";
    
    if (data && data != "") {
        sqlFiltro += ` AND DAY(r.dataLeitura) = DAY('${data}')
                       AND MONTH(r.dataLeitura) = MONTH('${data}')
                       AND YEAR(r.dataLeitura) = YEAR('${data}') `;
    } else {
        sqlFiltro += ` AND DAY(r.dataLeitura) = DAY(NOW())
                       AND MONTH(r.dataLeitura) = MONTH(NOW())
                       AND YEAR(r.dataLeitura) = YEAR(NOW()) `;
    }

    if (estufa && estufa.trim() != "") {
        sqlFiltro += ` AND e.nomeEstufa LIKE '%${estufa}%' `;
    }

    return sqlFiltro;
}

function maiorPico(fkEmpresa, data, estufa) {
    var filtros = aplicarFiltros(data, estufa);
    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            MAX(r.luminosidade) AS maiorLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        ${filtros}
        GROUP BY e.nomeEstufa
        ORDER BY maiorLuz DESC
        LIMIT 1;
    `
    return database.executar(instrucaoSql)
}

function menorPico(fkEmpresa, data, estufa) {
    var filtros = aplicarFiltros(data, estufa);
    var instrucaoSql = `
       SELECT 
            e.nomeEstufa,
            MIN(r.luminosidade) AS menorLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        ${filtros}
        GROUP BY e.nomeEstufa
        ORDER BY menorLuz ASC
        LIMIT 1;
    `
    return database.executar(instrucaoSql)
}

function alertasPorEstufa(fkEmpresa, data, estufa) {
    var filtros = aplicarFiltros(data, estufa);
    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            COUNT(*) AS qtdAlertas
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND (r.luminosidade > 200 OR r.luminosidade < 140)
        ${filtros}
        GROUP BY e.nomeEstufa
        ORDER BY qtdAlertas DESC;
    `
    return database.executar(instrucaoSql)
}

function registroLeituraHoras(fkEmpresa, data, estufa) {
    var filtros = aplicarFiltros(data, estufa);
    var instrucaoSql = `
        SELECT 
            HOUR(r.dataLeitura) AS hora,
            ROUND(AVG(r.luminosidade), 0) AS luminosidade
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        ${filtros}
        GROUP BY HOUR(r.dataLeitura)
        ORDER BY hora;
    `
    return database.executar(instrucaoSql)
}

function sensoresEmAlertaPorEstufa(fkEmpresa, data, estufa) {
    var filtros = aplicarFiltros(data, estufa);
    var instrucaoSql = `
        SELECT 
            e.nomeEstufa,
            COUNT(DISTINCT s.idSensor) AS qtdAlerta
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        AND r.luminosidade > 200
        ${filtros}
        GROUP BY e.nomeEstufa;
    `
    return database.executar(instrucaoSql)
}

function totalSensores(fkEmpresa, data, estufa) {
    // Se o usuário filtrar por uma estufa específica, o total de sensores deve refletir apenas ela
    var filtroEstufa = "";
    if (estufa && estufa.trim() != "") {
        filtroEstufa = ` AND e.nomeEstufa LIKE '%${estufa}%' `;
    }

    var instrucaoSql = `
        SELECT COUNT(*) AS total
        FROM sensor s
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE e.fkEmpresa = ${fkEmpresa}
        ${filtroEstufa};
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