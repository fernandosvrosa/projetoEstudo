angular.module('contatooh', ['ngRoute']).config(function($routeProvider){

  $routeProvider.when('/contatos',{
    templateUrl: 'partials/contatos.html',
    controller: 'ContatosController'
  });

  $routeProvider.when('/contato/:ContatoId',{
    templateUrl: 'partials/contato.html',
    controller: 'ContatoController'
  });

  $routeProvider.otherwise({redirectTo: '/contatos'});

});
