var database = require("../database/config")

// Cadastro de usuario na dashboard

function cadastrarUsuario(nome, email, nivelAcesso, nomeEstufa,senha, fkEmpresa, fkSuperior,) {

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
             ('${nome}', '${email}', ${nivelAcesso}, '${senha}', '${fkEmpresa}', '${fkEstufa}', ${fkSuperior});`;

            return database.executar(instrucaoUsuario);

        })

}

module.exports = {
    
    cadastrarUsuario
};
