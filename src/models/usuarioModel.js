var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idEmpresa, email FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, cnpj, email, senha, nomeEstufa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cnpj, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoEmpresa = `
        INSERT INTO empresa (nome,CNPJ, email, senha) VALUES ('${nome}','${cnpj}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoEmpresa)
        .then(function (resultadoEmpresa) {
            var idEmpresa = resultadoEmpresa.insertId;

            var instrucaoEstufa = `
            INSERT INTO estufa (nomeEstufa, fkEmpresa) VALUES ('${nomeEstufa}', ${idEmpresa})
            `;
            return database.executar(instrucaoEstufa);
        })

    console.log("Executando a instrução SQL: \n" + instrucaoEmpresa + instrucaoEstufa);
}

// Cadastro de usuario na dashboard

function cadastrarUsuario(nome, email, nivelAcesso, nomeEstufa, senha, fkEmpresa, fkSuperior) {

    console.log("function cadastrarUsuario():", nome, nivelAcesso, email, senha, fkEmpresa, nomeEstufa, fkSuperior);

    var instrucaoEstufa = `
        SELECT idEstufa FROM estufa WHERE nomeEstufa = '${nomeEstufa}' AND fkEmpresa = '${fkEmpresa}';
        `;

    console.log(`ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 
    'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.
     \n\n function cadastrar():`, nome, email, nivelAcesso, senha, fkEmpresa, fkSuperior);

    return database.executar(instrucaoEstufa)
        .then(function (resultadoEstufa) {
                
            var fkEstufa = resultadoEstufa[0].idEstufa // id da estufa buscada no select

            var instrucaoUsuario = `
            INSERT INTO usuario (nome,email,nivelAcesso,senha,fkEmpresa,fkEstufa,fkSuperior) VALUES
             ('${nome}', '${email}', '${nivelAcesso}', '${senha}', '${fkEmpresa}', '${fkEstufa}', ${fkSuperior});`;

            return database.executar(instrucaoUsuario);

        })

}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarUsuario
};