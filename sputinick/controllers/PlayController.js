/**
	PlayController
	author: Antony N. D. Alkmim
	date: 05/06/2014
**/

module.exports = function(app){

	var fs = require('fs');

	var PlayController = {

		index : function(req,res){

			//jogador logado
			params.user = req.session.user;
			
			res.render('play/index');
		},


		play: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;

			//le o arquivo de SQL
			fs.readFile("./sql/get_perfil_jogador.sql",'utf8',function(err,strSQL){
				if(err) throw err;

				//binds
				for(var i=0; i < strSQL.length; i++){
					strSQL = strSQL.replace(':NR_JOGADOR', req.params.nr_jogador);
				}

				var query = db.query(strSQL);
				query.on('row',function(row){
					params.adversario = {
						nr_jogador 	: row.nr_jogador,
						apelido		: row.apelido
					};
					res.render('play/play',params); 
				});
			});

		},


		finaliza_partida: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;

			//le o arquivo de SQL
			fs.readFile("./sql/nova_partida.sql",'utf8',function(err,strSQL){
				if(err) throw err;

				//binds
				strSQL = strSQL.replace(':NR_VENCEDOR', req.body.vencedor);
				strSQL = strSQL.replace(':NR_JOGADOR_1', req.body.nr_jogador_1);
				strSQL = strSQL.replace(':NR_JOGADOR_2', req.body.nr_jogador_2);

				console.log(strSQL);
				//adiciona novo amigo
				var query = db.query(strSQL,function(err,result){
					
				});
			});
		}
		
	};

	return PlayController;
};
