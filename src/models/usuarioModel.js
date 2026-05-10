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
function cadastrar(nome,cnpj, email, senha, nomeEstufa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email,cnpj, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoEmpresa = `
        INSERT INTO empresa (nome,CNPJ, email, senha) VALUES ('${nome}','${cnpj}', '${email}', '${senha}');
    `;
    return database.executar(instrucaoEmpresa)
        .then(function(resultadoEmpresa){
            var idEmpresa = resultadoEmpresa.insertId;
            
            var instrucaoEstufa = `
            INSERT INTO estufa (nomeEstufa, fkEmpresa) VALUES ('${nomeEstufa}', ${idEmpresa})
            `;
             return database.executar(instrucaoEstufa);
        })

    console.log("Executando a instrução SQL: \n" + instrucaoEmpresa + instrucaoEstufa);
}

// Cadastro de usuario na dashboard

function cadastrarUsuario(nome,cargo, email, senha, nomeEstufa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email,cargo, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoEmpresa = `
        INSERT INTO empresa (nome,cargo, email, senha) VALUES ('${nome}','${cargo}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoEmpresa);

    return database.executar(instrucaoEmpresa)
        .then(function(resultadoEmpresa){
            var idEmpresa = resultadoEmpresa.insertId;
            
            var instrucaoEstufa = `
            INSERT INTO estufa (nomeEstufa, fkEmpresa) VALUES ('${nomeEstufa}', ${idEmpresa})
            `;

            console.log("Executando a instrução SQL: \n" + instrucaoEstufa);
            
             return database.executar(instrucaoEstufa);



        })

}

module.exports = {
    autenticar,
    cadastrar,
    cadastrarUsuario
};