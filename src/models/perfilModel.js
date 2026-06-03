var database = require("../database/config");

function buscarPorId(idUsuario) {
    var instrucaoSql = `
        SELECT u.idUsuario, u.nome, u.email, e.nome AS nomeEmpresa 
        FROM usuario u
        JOIN empresa e ON u.fkEmpresa = e.idEmpresa
        WHERE u.idUsuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function editar(idUsuario, email, nome, novaSenha) {
    var instrucaoSql = `UPDATE usuario SET email = '${email}', nome = '${nome}', senha = '${novaSenha}' WHERE idUsuario = ${idUsuario};`;
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarPorId,
    editar
};
