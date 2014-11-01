/**
	IndexController
	author: Antony N. D. Alkmim
	date: 31/05/2014
**/

module.exports = function(app){

	var IndexController = {

		index : function(req,res){
			/*
				params:
					user_online: Dados do usuario logado
			*/
			var params = {};

			//LAYOUT DA PAGINA
			params.layout = 'main/layout_default'; 


			res.render('index/index',params);
		}

	};

	return IndexController;
};
