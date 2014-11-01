/**
	IndexRoutes
	author: Antony N. D. Alkmim
	date: 31/05/2014
**/


module.exports = function(app){
  
	var indexController = app.controllers.IndexController;

	app.get('/',indexController.index); // URL/

};
