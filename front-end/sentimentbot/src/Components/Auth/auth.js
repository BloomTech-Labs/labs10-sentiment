import auth0 from 'auth0-js';

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: 'bikbik.auth0.com',
    clientID: 'BnXSvU6tE4W8WGMt3gDWra24hXr8qY0e',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
  }
	
login() {
    this.auth0.authorize();
  }
};