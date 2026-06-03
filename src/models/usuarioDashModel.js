var database = require("../database/config")

// Cadastro de usuario na dashboard

function cadastrarUsuario(nome, nivelAcesso, nomeEstufa,fkEmpresa, fkSuperior,) {

    console.log("function cadastrarUsuario():", nome, nivelAcesso,fkEmpresa, nomeEstufa, fkSuperior);

    var instrucaoEstufa = `
        SELECT idEstufa FROM estufa WHERE nomeEstufa = '${nomeEstufa}' AND fkEmpresa = '${fkEmpresa}';
        `;

    console.log(`ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 
    'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.
     \n\n function cadastrar():`, nome, nivelAcesso, fkEmpresa, fkSuperior);

    return database.executar(instrucaoEstufa)
        .then(function (resultadoEstufa) {
                
            var fkEstufa = resultadoEstufa[0].idEstufa // id da estufa buscada no select

            var instrucaoUsuario = `
            INSERT INTO usuario (nome, nivelAcesso, fkEmpresa, fkEstufa, fkSuperior, statusPerfil) VALUES
            ('${nome}', ${nivelAcesso}, '${fkEmpresa}', '${fkEstufa}', ${fkSuperior}, 1);
        `;

            return database.executar(instrucaoUsuario);

        })

}

function buscarUsuarios(idEmpresa, idUsuario) {

    var instrucaoSql = `
 SELECT
        u.idUsuario,
        u.nome,
        CASE
            WHEN u.nivelAcesso = 0 THEN 'Adm'
            WHEN u.nivelAcesso = 1 THEN 'Gerente'
            WHEN u.nivelAcesso = 2 THEN 'Operador'
            WHEN u.nivelAcesso = 3 THEN 'Funcionário'
            ELSE 'Adm Principal'
        END AS nivelAcesso,
        CASE
            WHEN u.statusPerfil = 1 THEN 'Ativo'
            ELSE 'Inativo'
        END AS statusPerfil,
        IFNULL(e.nomeEstufa, 'Sem Estufa') AS nomeEstufa
    FROM usuario u
    LEFT JOIN estufa e
        ON u.fkEstufa = e.idEstufa
    WHERE u.fkEmpresa = ${idEmpresa}
    ORDER BY u.nome ASC;
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

function listar(fkEmpresa) {

    var instrucaoSql = `
        SELECT
            idEstufa,
            nomeEstufa
        FROM estufa
        WHERE fkEmpresa = ${fkEmpresa}
        ORDER BY nomeEstufa;
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

function alterarStatus(idUsuario, statusPerfil) {

    var instrucaoSql = `
        UPDATE usuario
        SET statusPerfil = ${statusPerfil}
        WHERE idUsuario = ${idUsuario};
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarUsuario,
    buscarUsuarios,
    listar,
    alterarStatus
};


