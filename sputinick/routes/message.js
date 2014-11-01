/**
	MessageController
	@since 08/06/2014
**/
module.exports = function(app){
  
	var MessageController = app.controllers.MessageController;

	app.post('/mensagens/enviar',MessageController.enviarMensagem);
	app.get('/mensagens',MessageController.listarMensagens);
	app.get('/mensagens/remove/:nr_msg',MessageController.removeMensagem);
	app.post('/enviar-convite/:email',MessageController.enviarConvite);

};