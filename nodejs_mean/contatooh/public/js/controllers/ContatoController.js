angular.module('contatooh').controller('ContatoController', function($scope, $routeParams, Contato){

  if ($routeParams.ContatoId) {
    Contato.get({id: $routeParams.ContatoId},
      function(contato){
        $scope.contato = contato;
      }, function(erro){
        $scope.mensagem = {texto: 'Não foi possivel obter contato'};
        console.log(erro);
      });
  }else{
      $scope.contato = new Contato();
  }


  $scope.salva = function(){
    $scope.contato.$save()
      .then(function(){
        $scope.mensagem = {texto: 'salvo com sucesso'};
        $scope.contato = new Contato();
      })
      .cath(function(erro){
        $scope.mensagem = {texto: 'Não foi possivel salvar'};
      });
  };
  
  Contato.query(function(contatos){
      $scope.contatos = contatos;
  });

});
