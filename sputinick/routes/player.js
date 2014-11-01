/**
	PlayerRoutes
	author: Antony N. D. Alkmim
	date: 31/05/2014
**/

module.exports = function(app){
  
	var playerController = app.controllers.PlayerController;

	app.get('/player',playerController.viewPerfil); //URL/player/index
	app.get('/player/search',playerController.search); //chamado para procurar um adversario para jogar
	app.post('/player/login',playerController.login); // URL/player/login
	app.get('/player/logout',playerController.logout); // URL/player/login
	app.get('/player/friends',playerController.friends); // URL/player/login
	app.post('/player/alterar_senha',playerController.alterar_senha); //chamado para remover conta
	app.post('/player/alterar_perfil',playerController.alterar_perfil); //chamado para alterar perfil
	app.post('/player/novo-jogador',playerController.novoJogador); //chamado via ajax pra criar novo jogador
	app.post('/player/novo_amigo',playerController.novoAmigo); //chamado via ajax pra adicionar novo amigo
	app.get('/player/friends/remove/:nr_amigo',playerController.removeFriend); // chamada via ajax pra remover amigo
	app.get('/player/friends/:nr_jogador',playerController.friends); // URL/player/login
	app.get('/player/:nr_jogador',playerController.viewPerfil); // URL/player/:nr_jogador
	app.get('/player/delete/:nr_jogador',playerController.deleteJogador); //chamado para remover conta

	

}
