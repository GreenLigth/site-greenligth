var database = require("../database/config");

function buscarPorId(idUsuario) {
    var instrucaoSql = `SELECT * FROM usuario WHERE idUsuario = ${idUsuario};`;
    return database.executar(instrucaoSql);
}

function editar(idUsuario, email, nome) {
    var instrucaoSql = `UPDATE usuario SET email = '${email}', nome = '${nome}' WHERE idUsuario = ${idUsuario};`;
    return database.executar(instrucaoSql);
}

function atualizarSenha(idUsuario, novaSenha) {
    var instrucaoSql = `UPDATE usuario SET senha = '${novaSenha}' WHERE idUsuario = ${idUsuario};`;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarPorId,
    editar,
    atualizarSenha
};
