import auth0 from "auth0-js";

const { insertUserMutation } = require("../graphql/mutations/userMutations");

class Auth {
  // Add your Auth0 credentials here
  auth0 = new auth0.WebAuth({
    domain: "dev-jlct10i9.auth0.com",
    clientID: "YSSAqccgFDqWmH5haikn76HxshTBm9x3",
    redirectUri: "http://localhost:3000/auth",
    responseType: "token id_token",
    scope: "openid profile email"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    // Call the Auth0 API to authenticate
    this.auth0.authorize();
  }

  parseJwt(token) {
    // Parse the JWT token
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  }

  handleAuth = () => {
    // parse the auth result and extract email
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const decoded = this.parseJwt(authResult.idToken);
        const email = decoded.email;
        this.setSession(authResult, email);
      } else if (err) {
        window.location.href = "/";
        alert(`Error: ${err.error}. Check the console for details.`);
      }
    });
  };

  async setSession(authResult, email) {
    // set the session by storing the auth result to browser local storage
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("Auth0->access_token", authResult.accessToken);
    localStorage.setItem("Auth0->id_token", authResult.idToken);
    localStorage.setItem("Auth0->expires_at", expiresAt);
    localStorage.setItem("Auth0->email", email);

    // insert the user email to the database
    await insertUserMutation(email);
    window.location.href = "/";
  }

  logout() {
    // logout by clearing off the session info
    localStorage.removeItem("Auth0->access_token");
    localStorage.removeItem("Auth0->id_token");
    localStorage.removeItem("Auth0->expires_at");
    localStorage.removeItem("Auth0->email");
    window.location.href = "/";
  }

  isAuthenticated() {
    // check if the expiration time has exceeded
    const expiresAt = JSON.parse(localStorage.getItem("Auth0->expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
export default Auth;
