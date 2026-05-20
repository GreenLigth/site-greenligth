-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE greenlight;
USE greenlight;

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,	
CNPJ VARCHAR(14) UNIQUE NOT NULL
);

CREATE TABLE setor(
idSetor INT PRIMARY KEY AUTO_INCREMENT,
UF CHAR(2) NOT NULL,
cidade VARCHAR(30) NOT NULL,
estrada VARCHAR(30)	NOT NULL,
km VARCHAR(4),
fkEmpresa INT,
CONSTRAINT chEmpresa
	FOREIGN KEY (fkEmpresa) 
	REFERENCES empresa (idEmpresa)
);

CREATE TABLE estufa (
idEstufa INT PRIMARY KEY AUTO_INCREMENT,
nomeEstufa VARCHAR(10),
fkSetor INT,
CONSTRAINT chSetor
	FOREIGN KEY (fkSetor)
    REFERENCES setor (idSetor),
fkEmpresa INT,
CONSTRAINT FkEmpresaCh
	FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) NOT NULL,
email VARCHAR(50) UNIQUE,
senha VARCHAR(20),
dtCadastro 	DATETIME DEFAULT CURRENT_TIMESTAMP,
fkEmpresa INT,
CONSTRAINT chFkEmpresa
	FOREIGN KEY (fkEmpresa) 
    REFERENCES empresa (idEmpresa),
statusPerfil BOOLEAN, 
nivelAcesso INT,
CONSTRAINT chAcesso
	CHECK (	nivelAcesso BETWEEN 0 AND 3),
fkEstufa INT,
	CONSTRAINT chEstufaUsuario 
		FOREIGN KEY (fkEstufa) 
		REFERENCES estufa (idEstufa),
fkSuperior INT,
	CONSTRAINT chSuperior
		FOREIGN KEY (fkSuperior) 
		REFERENCES usuario (idUsuario)
);

CREATE TABLE sensor (
idSensor INT PRIMARY KEY AUTO_INCREMENT,
codigoSensor CHAR (8),
fkEstufa INT,
CONSTRAINT chEstufa
	FOREIGN KEY (fkEstufa)
	REFERENCES estufa (idEstufa),
situacao BOOLEAN,
corredor VARCHAR(45),
bloco VARCHAR(10)
);

CREATE TABLE registroLuminosidade (
idRegistro INT AUTO_INCREMENT PRIMARY KEY,
luminosidade INT NOT NULL,
dataLeitura DATETIME DEFAULT NOW(),
fkSensor INT,
CONSTRAINT chFkSensor
FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);



-- EMPRESA
INSERT INTO empresa (nome, CNPJ) VALUES
('GreenLight', '12345678000199');


-- SETORES
INSERT INTO setor (UF, cidade, estrada, km, fkEmpresa) VALUES
('SP', 'Campinas', 'Rodovia Verde', '12', 1),
('MG', 'Uberlandia', 'Estrada Solar', '8', 1);

-- ESTUFAS
INSERT INTO estufa (nomeEstufa, fkSetor, fkEmpresa) VALUES
('Estufa A', 1, 1),
('Estufa B', 1, 1),
('Estufa C', 2, 1);

-- USUARIOS
INSERT INTO usuario 
(nome, email, senha, fkEmpresa, statusPerfil, nivelAcesso, fkEstufa, fkSuperior)
VALUES
('Administrador', 'admin@green.com', '123', 1, true, 3, 1, NULL),
('Carlos Silva', 'carlos@green.com', '123', 1, true, 2, 1, 1),
('Julia Souza', 'julia@green.com', '123', 1, true, 1, 2, 1),
('Fernanda Lima', 'fernanda@green.com', '123', 1, true, 1, 3, 1);

-- SENSORES
INSERT INTO sensor 
(codigoSensor, fkEstufa, situacao, corredor, bloco)
VALUES
('SENS0001', 1, true, 'Corredor 1', 'A'),
('SENS0002', 1, true, 'Corredor 2', 'A'),
('SENS0003', 2, true, 'Corredor 1', 'B'),
('SENS0004', 3, false, 'Corredor 3', 'C');

-- REGISTROS DE LUMINOSIDADE
INSERT INTO registroLuminosidade 
(luminosidade, dataLeitura, fkSensor)
VALUES
(450, NOW(), 1),
(500, NOW(), 1),
(520, NOW(), 1),

(300, NOW(), 2),
(320, NOW(), 2),
(310, NOW(), 2),

(700, NOW(), 3),
(720, NOW(), 3),
(680, NOW(), 3),

(150, NOW(), 4),
(180, NOW(), 4),
(170, NOW(), 4);


CREATE VIEW vw_listarRegistros AS
        SELECT 
            r.idRegistro,
            r.luminosidade,
            r.dataLeitura,
            s.codigoSensor,
            s.corredor,
            s.bloco,
            e.nomeEstufa
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        ORDER BY r.dataLeitura DESC;
        
CREATE VIEW vw_maiorPico AS
        SELECT 
            e.nomeEstufa,
            MAX(r.luminosidade) AS maiorLuz
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa
        ORDER BY maiorLuz DESC
        LIMIT 1;
        
CREATE VIEW vw_mediaMensal AS
 SELECT 
            ROUND(AVG(r.luminosidade), 0) AS mediaLuz
        FROM registroLuminosidade r
        WHERE MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW());
		
CREATE VIEW vw_contagemStatus AS
        SELECT 
        CASE
            WHEN r.luminosidade > 30000 THEN 'muito-alta'
            WHEN r.luminosidade BETWEEN 20000 AND 30000 THEN 'alta'
            WHEN r.luminosidade BETWEEN 8000 AND 20000 THEN 'ideal'
            ELSE 'baixa'
        END AS status,
        COUNT(*) AS quantidade
        FROM registroLuminosidade r
        WHERE MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY status;
        
CREATE VIEW vw_mediaPorMes AS
        SELECT 
            MONTH(r.dataLeitura) AS mes,
            ROUND(AVG(r.luminosidade), 0) AS mediaLuz
        FROM registroLuminosidade r
        WHERE YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY mes
        ORDER BY mes;
        
CREATE VIEW vw_sensoresAlerta AS
        SELECT 
            e.nomeEstufa,
            COUNT(DISTINCT s.idSensor) AS qtdAlerta
        FROM registroLuminosidade r
        JOIN sensor s ON r.fkSensor = s.idSensor
        JOIN estufa e ON s.fkEstufa = e.idEstufa
        WHERE r.luminosidade > 30000
          AND MONTH(r.dataLeitura) = MONTH(NOW())
          AND YEAR(r.dataLeitura) = YEAR(NOW())
        GROUP BY e.nomeEstufa;
        
CREATE VIEW vw_qtdTotal AS
SELECT COUNT(*) AS total FROM sensor;
