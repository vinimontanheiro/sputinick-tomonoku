/**
	MessageController
	@since 08/06/2014
**/

module.exports = function(app){
	var fs = require('fs');

	var MessageController = {
			
		enviarConvite : function enviarConvite(req,res) {
			console.log('Email');
			console.log(req.params.email);
			
			var email = require("../node_modules/nodemailer");
			var transport = email.createTransport("SMTP",{
				host: 'smtp-mail.outlook.com',
			    secureConnection: false,
			    strictSSL : false,
			    port: 587, 
			    auth: {
			        user: 'sputinic@outlook.com',
			        pass: 'S#cur1ty'
			    },
			    tls:{
			        ciphers:'SSLv3'
			    },
			   
			});

			var message = {
				from: "Convite <sputinic@outolook.com>",
				to: req.params.email,
				subject: "Convite de amizade do jogo Sputinic Tomonoku",
				text:    "Faça parte do jogo Sputinic, acesse agora o link:",
				//html: "<b>Hello world ✔</b>" // html body
			};

			transport.sendMail(message, function(error, response){
				if(error){
					throw error;
				}
				console.log("Mensagem Enviada: " + response.message);
			});
			res.send(200);			
		},


		enviarMensagem: function(req,res){
			var params = {};
			var db = global.db.getDb();

			console.log(req.body.nr_jogador + " para " + req.body.mensagem);
			
			//le o arquivo de SQL
			fs.readFile("./sql/nova_mensagem.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':NR_JOGADOR', req.session.user.nr_jogador); 
				strSQL = strSQL.replace(':NR_AMIGO', req.body.nr_jogador); 
				strSQL = strSQL.replace(':CONTEUDO', req.body.mensagem); 
				
				console.log(strSQL);
				//seleciona amigos
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;
				});
			});
		},



		listarMensagens: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;


			//le o arquivo de SQL
			fs.readFile("./sql/select_mensagens.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':NR_JOGADOR', req.session.user.nr_jogador); 
				
				//seleciona amigos
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;

					params.mensagem = result.rows; //vetor de amigos
					console.log(params.mensagem); 
					res.render('mensagens/index',params);
				});
				
			});

		},

		removeMensagem: function(req,res){
			var params = {};
			var db = global.db.getDb();

			//jogador logado
			params.user = req.session.user;


			//le o arquivo de SQL
			fs.readFile("./sql/delete_mensagem.sql",'utf8',function(err,strSQL){
				if(err) throw err;
				//binds
				strSQL = strSQL.replace(':NR_MSG', req.params.nr_msg); 
				console.log(strSQL);
				//seleciona amigos
				var query = db.query(strSQL,function(err,result){
					if(err) throw err;
 
					res.redirect('/mensagens');
				});
				
			});

		}


	};

	return MessageController;
};