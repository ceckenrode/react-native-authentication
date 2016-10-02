import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor() {
    super();
    this.state = { loggedIn: null };
  }
  componentWillMount() {
    firebase.initializeApp({apiKey: 'AIzaSyBxeDwnXSBqu-61JtCNOZaPRmVui_hxkMc', authDomain: 'native-auth-14645.firebaseapp.com', databaseURL: 'https://native-auth-14645.firebaseio.com', storageBucket: 'native-auth-14645.appspot.com', messagingSenderId: '469338192488'});

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  render() {
    return (
      <View>
        <Header headerText="Authentication"/>
        {this.renderContent()}
      </View>
    );
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <Button
          onPress={() => firebase.auth().signOut()}>
          Log Out
        </Button>
      );
      case false:
        return <LoginForm />;
      default:
        return (
          <View>
            <Spinner size="large" />
          </View>
        );
    }
  }
}

export default App;
