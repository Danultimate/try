import Oauth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default Oauth2PasswordGrant.extend({

    // serverTokenEndpoint: 'api/login',
    serverTokenEndpoint: 'https://localhost:5000/api/login',
    serverTokenRevocationEndpoint: 'https://localhost:5000/api/logout'

});