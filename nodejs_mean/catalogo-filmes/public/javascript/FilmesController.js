angular.module('catalogo')
    .controller('FilmesController', function($http, $scope) {
    $http.get('/lista').success(function(retorno){
        $scope.filmes = retorno.filmes;
    });

	function Filme() {
        this.nome = '';
        this.diretor = '';
        this.ano = '';
    }

    $scope.filme = new Filme();

 	var adicionaFilme = function(){
    	$http.post('/grava', $scope.filme)
    		.success(function(retorno){
	       		$scope.filmes.push(retorno);
	       		$scope.filme = new Filme();
	    });
    }

    var atualizaFilme = function(){
      $http.put('/filme', $scope.filme)
      .success(function(retorno){
        $scope.filme = new Filme();
      })
    }

    $scope.mostraFilme = function(filme){
    	$scope.filmeSelecionado = filme;
    }

    $scope.deletaFilme = function(filme){
    	$http.delete('/filme/' + filme._id).success(function(err, retorno) {
            $scope.filmeSelecionado = null;
            var index = $scope.filmes.indexOf(filme);
            $scope.filmes.splice(index, 1);
        });
    }

    $scope.editaFilme = function(filme){
      $scope.filme = filme;ter
    }

    $scope.enviaFilme = function(){
      if ($scope.filme._id) {
        atualizaFilme();
      }else{
        adicionaFilme();
      }
    }
});
