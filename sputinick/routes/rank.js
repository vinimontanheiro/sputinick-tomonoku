/**
	RankRoutes
	author: Antony N. D. Alkmim
	date: 31/05/2014
**/


module.exports = function(app){
  
	var rankController = app.controllers.RankController;

	app.get('/rank',rankController.index); // URL/

};
