var Filme = require('../models/filme');

exports.index = function(req, res){
    res.render('index');
}

exports.lista = function(req, res){
    Filme.find({}, function(err, filmes){
    	if (err) return console.log(err);

    	res.json({filmes: filmes});
    });
};

exports.grava = function(req, res) {
    var filme = new Filme(req.body);

    filme.save(function(err, filme){
    	if (err) {return console.log(err);}

    	res.send(filme);
    });
};

exports.deleta = function(req, res){
	var id = req.params.id;
    Filme.findByIdAndRemove(id, function(err, filme) {
        res.send('Filme ' + filme.titulo + ' removido com sucesso');
    });
};

exports.atualiza = function(req, res){
  var id = req.body._id;
  delete req.body._id;
  Filme.findByIdAndUpdate(id, req.body, function(err, filme){
    res.send('Filme ' + filme.titulo + ' atualizado com sucesso!');
  });
};
