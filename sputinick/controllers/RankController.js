/**
	RankController
	author: Antony N. D. Alkmim
	date: 14/06/2014
**/

module.exports = function(app){

	var RankController = {

		index : function(req,res){
			var params = {};
			
			//jogador logado
			params.user = req.session.user;
			
			res.render('rank/index',params);
		}
		
	};

	return RankController;
};
