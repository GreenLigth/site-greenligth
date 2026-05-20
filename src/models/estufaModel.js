const database = require("../database/config");

function cadastrarEstufa(nome, uf, cidade, estrada, km, fkEmpresa) {
    const instrucaoSetor = `
        INSERT INTO setor (UF, cidade, estrada, km, fkEmpresa) 
        VALUES ('${uf}', '${cidade}', '${estrada}', '${km}', ${fkEmpresa});
    `;

    console.log("Executando instrução SQL (Setor): \n", instrucaoSetor);
    
    return database.executar(instrucaoSetor)
        .then(resultadoSetor => {
            // Varre todas as estruturas possíveis onde o insertId costuma vir no MySQL
            let fkSetor = null;

            if (resultadoSetor) {
                if (resultadoSetor.insertId !== undefined) {
                    fkSetor = resultadoSetor.insertId;
                } else if (resultadoSetor[0] && resultadoSetor[0].insertId !== undefined) {
                    fkSetor = resultadoSetor[0].insertId;
                } else if (resultadoSetor.insertId === undefined && resultadoSetor.affectedRows !== undefined) {
                    // Caso o objeto seja o cabeçalho direto do mysql2
                    fkSetor = resultadoSetor.insertId;
                }
            }

            // Se mesmo assim não achar (caso o config retorne o array diferente), usamos o plano B do MySQL:
            if (!fkSetor || fkSetor == null) {
                console.log("Aviso: insertId não encontrado diretamente. Tentando recuperar via query secundária.");
                return database.executar("SELECT LAST_INSERT_ID() as lastId;").then(resultadoId => {
                    fkSetor = resultadoId[0].lastId;
                    return executarInsertEstufa(nome, fkSetor, fkEmpresa);
                });
            }

            return executarInsertEstufa(nome, fkSetor, fkEmpresa);
        });
}

// Função auxiliar interna para executar a segunda inserção sem duplicar código
function executarInsertEstufa(nome, fkSetor, fkEmpresa) {
    const instrucaoEstufa = `
        INSERT INTO estufa (nomeEstufa, fkSetor, fkEmpresa) 
        VALUES ('${nome}', ${fkSetor}, ${fkEmpresa});
    `;

    console.log("Executando instrução SQL (Estufa): \n", instrucaoEstufa);
    return database.executar(instrucaoEstufa);
}

module.exports = {
    cadastrarEstufa
};