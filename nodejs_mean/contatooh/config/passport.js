var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function(){
    
    var Usuario = mongoose.model('Usuario');
    
    passport.use(new GitHubStrategy({
        clientID: '924d272985d8a35b6286',
        clientSecret: '2f3eeaffaed49bfdc44f947528001e72749443c8',
        callbackURL: 'http://localhost:3000/auth/github/callback'    
        },function(accessToken, refreshToken, profile, done){
            Usuario.findOrCreate(
                {"login": profile.username},
                {"nome": profile.username},
                function(erro, usuario){
                    if(erro){
                        console.log(erro);
                        return done(erro);
                    }
                    return done(null, usuario);
                }
            );
    }));  
    
    /*
        Chamado uma unica vez no login do usuario.
    */
    passport.serializeUser(function(usuario, done){
        done(null, usuario._id);
    });
    
    /*
        chama a cada requisicao, recebendo o objectId do usuario armazenado na sessao 
    */
    
    passport.deserializeUser(function(id, done){
        Usuario.findById(id).exec()
        .then(function(usuario){
           done(null, usuario);
        });
    });
    
};