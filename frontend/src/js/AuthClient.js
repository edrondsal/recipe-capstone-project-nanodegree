import createAuth0Client from '@auth0/auth0-spa-js';
import {config} from './Config'


/**
* @class AuthClient
* @classdesc Module handling the login logic
*/
var AuthClient = (function () {

  return {

    configureClient: async function(){
      return createAuth0Client({
        domain: config.domain,
        client_id: config.clientId,
        responseType: 'token id_token',
        scope: 'openid'
      });
    },
    isAuthenticated: async function(auth0){
      return auth0.isAuthenticated();
    },
    login: async function(auth0){
      return auth0.loginWithRedirect({
          redirect_uri: window.location.origin
        });
    },
    handleRedirectCall: async function(auth0){
        return auth0.handleRedirectCallback();
    },
    logout: async function(auth0){
        return auth0.logout({
          returnTo: window.location.origin
        });
    },
    getToken: async function(auth0){
      const tokenClaims = await auth0.getIdTokenClaims();
      return tokenClaims.__raw;
    }
  };


})();

export {AuthClient}