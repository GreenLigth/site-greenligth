var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario, email,fkEmpresa FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, nomeAdm, cnpj, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n function cadastrar():", nome, nomeAdm, cnpj, email, senha);

    var instrucaoEmpresa = `
        INSERT INTO empresa (nome, CNPJ) VALUES ('${nome}', '${cnpj}');
    `;

    var idEmpresa; 

    return database.executar(instrucaoEmpresa)
        .then(function (resultadoEstufa) {
            var instrucaoUser = `
                INSERT INTO usuario (nome, email, senha, fkEmpresa) VALUES ('${nomeAdm}', '${email}', '${senha}', ${idEmpresa});
            `;
            
            console.log("Executando a instrução SQL Usuário: \n" + instrucaoUser);
            return database.executar(instrucaoUser);
        });
}


module.exports = {
    autenticar,
    cadastrar
};