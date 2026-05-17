var database = require("../database/config");

function buscarUsuarios(idEmpresa) {
    var instrucaoSql = `
        SELECT 
            u.idUsuario,
            u.nome,
            CASE 
                WHEN u.nivelAcesso = 1 THEN 'Adm'
                WHEN u.nivelAcesso = 2 THEN 'Gerente'
                WHEN u.nivelAcesso = 3 THEN 'Operador'
                ELSE 'Desconhecido'
            END AS nivelAcesso,
            CASE 
                WHEN u.statusPerfil = 1 THEN 'Ativo'
                ELSE 'Inativo'
            END AS statusPerfil,
            IFNULL(e.nomeEstufa, 'Sem Estufa') AS nomeEstufa
        FROM usuario u
        LEFT JOIN estufa e ON u.fkEmpresa = e.fkEmpresa
        WHERE u.fkEmpresa = ${idEmpresa}
        ORDER BY u.nome ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUsuarios
};