import React, { Component } from 'react';
import { auth, provider } from "./config";
import { signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import TkdappList from './tkdapp-list.component';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const userEmail = userCredential.user.email;
        this.setState({ email: userEmail });
        localStorage.setItem("email", userEmail);
      })
      .catch((error) => {
        console.log("Error occurred during sign-in with Google:", error);
      });
  };

  handleSignInWithEmail = () => {
    const email = prompt('Ingrese su correo electrónico:');
    const password = prompt('Ingrese su contraseña:');

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const userEmail = userCredential.user.email;
          this.setState({ email: userEmail });
          localStorage.setItem("email", userEmail);
        })
        .catch((error) => {
          console.log("Error occurred during sign-in with email and password:", error);
        });
    }
  };

  handleSignOut = () => {
    signOut(auth)
      .then(() => {
        this.setState({ email: '' });
        localStorage.removeItem("email");
      })
      .catch((error) => {
        console.log("Error occurred during sign-out:", error);
      });
  };

  componentDidMount() {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      this.setState({ email: storedEmail });
    }
  }

  render() {
    const { email } = this.state;

    return (
      <div className="loginmain">
        {email ? (
          <div>
            <h2>Bienvenido, {email}!</h2>
            <button className="boton-logout" onClick={this.handleSignOut}>
              Logout
            </button>
            <TkdappList email={email}/>
          </div>
        ) : (
          <div>
            <button className="boton-login" onClick={this.handleSignInWithGoogle}>
              Sign in with Google
            </button>
            <button className="boton-email" onClick={this.handleSignInWithEmail}>
              Sign in with Email
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
