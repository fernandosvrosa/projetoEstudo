angular.module('contatooh').controller('ContatosController',function($scope, $resource){

    $scope.contatos = [];

    $scope.filtro='';

    var Contato = $resource('/contatos/:id');


    function buscarContatos(){
      Contato.query(
        function(contatos){
          $scope.contatos = contatos;
        },
        function(erro){
          console.log("Não foi possivel obter a lista de contatos");
          console.log(erro);
        }
      );
    }

    buscarContatos();



    $scope.remover = function(contato){
      Contato.delete({id: contato._id}, buscarContatos,
      function(erro){
        console.log("Não foi possivel remover o contato");
        console.log(erro);
      });
    }

});
