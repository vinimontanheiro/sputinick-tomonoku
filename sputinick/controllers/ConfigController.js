/**
	ConfigController
	author: Antony N. D. Alkmim
	date: 06/06/2014
**/

module.exports = function(app){

	var ConfigController = {

		index : function(req,res){
			/*
				params:
					user_online: Dados do usuario logado
			*/
			var params = {};


			//jogador logado
			params.user = req.session.user;

			res.render('config/index',params);
		}

	};

	return ConfigController;
};
