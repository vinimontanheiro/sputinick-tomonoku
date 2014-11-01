
/**
 * Module dependencies.
 */

var express = require('express'), 
load = require('express-load'),
http = require('http'),
path = require('path'),
expressLayouts = require('express-ejs-layouts'),
postgres = require('pg'),
app = express();




// all environments
app.set('port', process.env.PORT || 90);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','main/layout');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser('dicol'));
app.use(express.session());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//Carregando arquivos de modelo e controle e rotas
load('models').then('controllers').then('routes').into(app);
//Pagina nao encontrada
app.get('*',function(req,res){
	//res.send(404);
	res.render('error/404',{layout:'main/layout_default'});
}); //404 page not found



var Connection = require('./connection.js');
//conecta ao servidor de banco de dados
global.db = new Connection('localhost','postgres','1233212','5432','sputinick',postgres);





module.exports = app;

app.listen(app.get('port'), function(){
  	//console.log('Express server listening on port ' + app.get('port'));
  	console.log("######## Sputinick Tomonoku ########");
	console.log("#######   Powerade by CoderUp! | www.coderup.com.br  #######");
});

