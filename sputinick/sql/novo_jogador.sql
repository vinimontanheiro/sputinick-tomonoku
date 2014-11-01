INSERT INTO JOGADORES (apelido,email,senha,dt_cadastro,nome)
VALUES (
	':APELIDO',
	':EMAIL',
	MD5(':SENHA'),
	NOW(),
	':NOME'
);