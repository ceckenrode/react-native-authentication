import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '', loading: false };
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="jonhdoe@gmail.com"
            label="Email:"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password:"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
  onButtonPress() {
    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password).then(this.onLoginSuccess.bind(this))
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(this.onLoginSuccess.bind(this)).catch(this.onLoginFail.bind(this));
    });
  }
  renderButton() {
    if (this.state.loading) {
      return (
        <Spinner size="small" />
      );
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }
  onLoginSuccess() {
    this.setState({ error: '', loading: false, email: '', password: '' });
  }
  onLoginFail() {
    this.setState({ error: 'Authentication failed', loading: false });
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
