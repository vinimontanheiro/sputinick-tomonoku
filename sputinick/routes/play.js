/**
	PlayRoutes
	author: Antony N. D. Alkmim
	date: 31/05/2014
**/


module.exports = function(app){
  
	var playController = app.controllers.PlayController;

	app.get('/play',playController.index); // URL/
	app.post('/play/finaliza_partida',playController.finaliza_partida); // URL/
	app.get('/play/:nr_jogador',playController.play); // URL/

};
