import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { signIn, signOut } from '../actions'; 

class GoogleAuth extends Component {

  componentDidMount () {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '1038990540619-b2kicrmq4g0gg0vb1stdm290hfeh7t4c.apps.googleusercontent.com', 
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        // this.auth is now equal to the signed in user's Auth Instance object 

        this.onAuthChange(this.auth.isSignedIn.get()); 
        // listen takes a callback function that runs if the login status of the Auth Instange
        // has changed 
        this.auth.isSignedIn.listen(this.onAuthChange)
      }); 
    })
  }

  // this callback gets called with a boolean argument from the listen method aka it will accept
  // either a true or false 
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      // here we are sending the current user's id to the action creator 
      this.props.signIn(this.auth.currentUser.get().getId()); 
    } else {
      this.props.signOut(); 
    }
  }

  onSignIn = () => {
    this.auth.signIn(); 
  }

  onSignOut = () => {
    this.auth.signOut(); 
  }

  renderAuthButton () {
    if (this.props.isSignedIn) {
      return (
        <button className="ui red google button" onClick={this.onSignOut}>
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignIn}>
          <i className="google icon"></i>
          Sign In With Google
        </button>
      );
    }
  }

  render () {
    return (
      <div> {this.renderAuthButton()}</div>
    );
     

  }
}

const mapStateToProps = state => {
  return { isSignedIn : state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth); 