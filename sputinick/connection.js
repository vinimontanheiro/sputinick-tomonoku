/**
	Connection
	author: Antony N. D. Alkmim
	date: 08/06/2014
**/

function ConnectionDB(host,user,password,port,database,postgres){

	//String de conexao ao banco de dados
	var ConnectionString = "postgres://" 
						+	user		+ ":"
						+	password	+ "@"
						+	host		+ ":"
						+	port 		+ "/"
						+	database;

	//Cria um cliente para a conexao
	this.clientDB = new postgres.Client(ConnectionString);
	//Faz a conexao
	this.clientDB.connect(function(err){
		if(err)
			return console.log("Nao foi possivel conectar ao servidor de dados: ", err);
		else
			return console.log("Conectado ao SputinickDB");
	});
}

ConnectionDB.prototype = {
	//retorna o objeto clientDB para utilizar nos models do projeto
	getDb : function getDb(){
		return this.clientDB;
	}
};

module.exports = ConnectionDB;

