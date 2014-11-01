/**
	ConfigRoutes
	author: Antony N. D. Alkmim
	date: 06/06/2014
**/


module.exports = function(app){
  
	var configController = app.controllers.ConfigController;

	app.get('/config',configController.index); // URL/

};
