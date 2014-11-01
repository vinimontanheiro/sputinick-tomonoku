/**
	PlayerController
	author: Antony N. D. Alkmim
	date: 31/05/2014 
**/

module.exports = function(app){

	//Modulos necessarios no processamento das paginas
	var md5 = require('MD5'); //hash da senha
	var fs = require('fs');

	var PlayerController = {

		/*--# Mostra o Perfil do Jogador #--*/
		viewPerfil :  function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;

			//verifica qual perfil mostrar
			//do jogador logado ou de um jogador informado via GET
			var nr_perfil = req.params.nr_jogador ? req.params.nr_jogador : params.user.nr_jogador; 

			//le o arquivo de SQL
			fs.readFile("./sql/get_perfil_jogador.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				for(var i=0; i < strSQL.length; i++){
					strSQL = strSQL.replace(':NR_JOGADOR', nr_perfil);
				}
				
				//seleciona usuario 
				var query = db.query(strSQL);
				query.on('row', function(row){
					params.perfil = row;
					
					//le o arquivo de SQL
					fs.readFile("./sql/get_estatisticas_jogador.sql",'utf8',function(err,strSQL){
						if(err) throw err;
						//binds
						for(var i=0; i < strSQL.length; i++){
							strSQL = strSQL.replace(':NR_JOGADOR', nr_perfil);
						}
						//seleciona usuario 
						var query = db.query(strSQL);
						query.on('row', function(row){
							params.perfil.estatisticas = row;
							
							//le o arquivo de SQL
							fs.readFile("./sql/ultimos_10_adversarios.sql",'utf8',function(err,strSQL){
								if(err) throw err;
								//binds
								for(var i=0; i < strSQL.length; i++){
									strSQL = strSQL.replace(':NR_JOGADOR', nr_perfil);
								}
								//seleciona usuario 
								var query = db.query(strSQL,function(err,result){
									params.perfil.estatisticas.ultimos_jogos = result.rows;
									
									//le o arquivo de SQL
									fs.readFile("./sql/lista_historico_partidas.sql",'utf8',function(err,strSQL){
										if(err) throw err;
										//binds
										for(var i=0; i < strSQL.length; i++){
											strSQL = strSQL.replace(':NR_JOGADOR', nr_perfil);
										}
										//seleciona usuario 
										var query = db.query(strSQL,function(err,result){
											params.perfil.estatisticas.historico = result.rows;
											
											console.log(params.perfil);
											res.render('player/index',params);
										});
									});
								});
							});
						});
					});
				});
			});
		},


		/*--# Efetua login #--*/
		login: function(req,res){
			var params = {};
			var db = global.db.getDb();

			var apelido = req.body.apelido;
			var senha = md5(req.body.senha);
			
			//le o arquivo de SQL
			fs.readFile("./sql/get_jogador_login.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':APELIDO', apelido);
				//seleciona usuario 
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;

					if(result.rows.length > 0){ //existe o usuario
						usr = result.rows[0];
						if (usr.senha == senha) { //senha correta
							req.session.user = usr; //coloca o usuario na sessao
							res.redirect('/player'); //vai pra pagina de perfil
						}else{//senha incorreta
							console.log('SENHA INCORRETA');
							res.redirect('/'); //retorna para a pagina
						}
					}else{
						console.log('LOGIN INCORRETO');
						res.redirect('/'); //retorna para a pagina
					}
				});

			});
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},


		/*--# Lista os amigos #--*/
		friends: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;

			//verifica se e pra buscar amigos do jogador logado ou de algum jogador informado via GET
			var nr_jogador = req.params.nr_jogador ? req.params.nr_jogador : params.user.nr_jogador; 

			//le o arquivo de SQL
			fs.readFile("./sql/select_amigos.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':NR_JOGADOR', nr_jogador); //mudar depois para pegar os amigos do jogador logado
				
				//seleciona amigos
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;

					params.friends = result.rows; //vetor de amigos
					console.log(params.friends); 
					res.render('player/friends',params);
				});
				
			});

		},

		/*--# CRIA NOVO JOGADOR #--*/
		novoJogador: function(req,res){
			var params = {};
			var db = global.db.getDb();


			//le o arquivo de SQL
			fs.readFile("./sql/novo_jogador.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':APELIDO', req.body.apelido);
				strSQL = strSQL.replace(':EMAIL', req.body.email);
				strSQL = strSQL.replace(':SENHA', req.body.senha);
				strSQL = strSQL.replace(':NOME', req.body.nome); 
				
				//seleciona amigos
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;
					
					//mudar pra redirect e pegar a menssagem e dados do usuario da sessao
					res.json({success:true});
				});
				
			});
		},


		deleteJogador: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;

			console.log("Removendo jogador:" + req.params.nr_jogador);

			if(req.params.nr_jogador === null){
				res.redirect('/player');
			}else{
				//le o arquivo de SQL
				fs.readFile("./sql/delete_jogador.sql",'utf8',function(err,strSQL){
					if(err) throw err;
					//binds
					strSQL = strSQL.replace(':NR_JOGADOR', req.params.nr_jogador);
					
					//remove jogador
					var query = db.query(strSQL,function(err,result){
						if(err) throw err;

						//mudar pra redirect e pegar a menssagem e dados do usuario da sessao
						res.redirect('/');
					});
					
				});
			}
		},


		alterar_senha: function(req,res){
			var db = global.db.getDb();

			if(md5(req.body.senha_antiga) == req.session.user.senha){

				//le o arquivo de SQL
				fs.readFile("./sql/alterar_senha.sql",'utf8',function(err,strSQL){
					if(err) throw err;
					//binds
					strSQL = strSQL.replace(':NR_JOGADOR', req.session.user.nr_jogador);
					strSQL = strSQL.replace(':NOVA_SENHA', req.body.nova_senha);
					
					//remove jogador
					var query = db.query(strSQL,function(err,result){
						if(err) throw err;
						console.log(result);


						req.session.user.senha = md5(req.body.nova_senha);
						res.json({success:true});
					});
					
				});

			}else{ //senha antiga incorreta
				res.json({success:false});
			}
		},


		
		alterar_perfil:function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;
			
			//le o arquivo de SQL
			fs.readFile("./sql/update_perfil.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':NR_JOGADOR', req.session.user.nr_jogador);
				strSQL = strSQL.replace(':NOME', req.body.nome_alterar);
				strSQL = strSQL.replace(':DT_NASCIMENTO', req.body.dt_nascimento_alterar);
				strSQL = strSQL.replace(':UF', req.body.uf_alterar);
				strSQL = strSQL.replace(':CIDADE', req.body.cidade_alterar);
				
				console.log(strSQL);
				//remove jogador
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;
					console.log(result);
					//mudar pra redirect e pegar a menssagem e dados do usuario da sessao
					res.redirect('/player');
				});
			});
		},


		removeFriend: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;

			//le o arquivo de SQL
			fs.readFile("./sql/remove_amigo.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':NR_JOGADOR', req.session.user.nr_jogador);
				strSQL = strSQL.replace(':NR_AMIGO', req.params.nr_amigo);

				//remove jogador
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;
					res.redirect('/player/friends');
				});
			});
		},



		search: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;
			
			//le o arquivo de SQL
			fs.readFile("./sql/lista_jogadores.sql",'utf8',function(err,strSQL){
				if(err) throw err;

				//binds
				strSQL = strSQL.replace(':NR_JOGADOR', req.session.user.nr_jogador);

				//seleciona jogadores
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;

					params.jogadores = result.rows; //vetor de amigos
					console.log(params.jogadores); 
					res.render('player/search',params);
				});
			});
		},



		novoAmigo : function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;

			//le o arquivo de SQL
			fs.readFile("./sql/novo_amigo.sql",'utf8',function(err,strSQL){
				if(err) throw err;

				//binds
				strSQL = strSQL.replace(':NR_JOGADOR_1', req.session.user.nr_jogador);
				strSQL = strSQL.replace(':NR_JOGADOR_2', req.body.nr_jogador);

				console.log(strSQL);
				//adiciona novo amigo
				var query = db.query(strSQL,function(err,result){
					if(err) 
						res.json({success:false,msg:'Jogador ja é amigo!'}); 
				});
			});
		}








		//InviteToPlay	: function(req,res){} //Convidar jogador ja cadastrado para jogar
		//SearchPlayer	: function(req,res){} //procurar jogador
	};

	return PlayerController;
};
