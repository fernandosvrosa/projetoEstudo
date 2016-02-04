angular.module('contatooh').controller('ContatosController',function($scope, Contato){

    $scope.contatos = [];

    $scope.filtro='';

    $scope.mensagem = {texto: ''};


    function buscarContatos(){
      Contato.query(
        function(contatos){
          $scope.contatos = contatos;
        },
        function(erro){
          console.log(erro);
          $scope.mensagem = {texto: 'Não foi possivel obter a lista de contatos'};
        }
      );
    }

    buscarContatos();



    $scope.remover = function(contato){
      Contato.delete({id: contato._id},
      buscarContatos,
      function(erro){
        console.log(erro);
        $scope.mensagem = {texto: 'Não foi possivel remover contato'};
      });
    };

});
