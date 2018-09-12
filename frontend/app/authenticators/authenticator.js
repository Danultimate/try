import Oauth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'frontend/config/environment';

export default Oauth2PasswordGrant.extend({

    serverTokenEndpoint: ENV.host+'api/login',
    serverTokenRevocationEndpoint: ENV.host+'api/login',
    // serverTokenEndpoint: 'https://localhost:5000/api/login',
    // serverTokenRevocationEndpoint: 'https://localhost:5000/api/logout'

});