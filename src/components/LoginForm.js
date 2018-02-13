import React, {Component} from 'react';
import { View, Text , StatusBar} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser, clearAll} from '../actions';
import SignupForm from './SignupForm'


class LoginForm extends Component {

    componentDidMount() {
        StatusBar.setHidden(true);
     }

    static navigationOptions = {
        title: 'WELCOME',
    
      };

   onEmailChange(text){
        this.props.emailChanged(text);
   }

   onPasswordChange(text){
    this.props.passwordChanged(text);
    }

    onLoginButtonPress(){
        const {email, password } = this.props;
        this.props.loginUser({email, password});
    }

    onSignupButtonPress(){
        const { navigate } = this.props.navigation;
        navigate('SignupForm')
        this.props.clearAll();
    }


  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

    

    render (){

        return ( 
           
        <View> 
            <Card>
                <CardSection>
                    <Input label="Email" placeholder="Email" 
                    onChangeText={this.onEmailChange.bind(this)} value = {this.props.email}/>
                </CardSection>

                <CardSection>
                    <Input secureTextEntry label="Password" placeholder="Password" 
                    onChangeText={this.onPasswordChange.bind(this)} value = {this.props.password}/>
                </CardSection>
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                <CardSection>
                     <Button onPress = {this.onSignupButtonPress.bind(this)}> Don't have an account? Click here to Signup</Button>
                </CardSection>
            </Card>
            </View>
        )

    }
}

const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }
  };
  
  const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;
    return { email, password, error, loading };
  };
  
  export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser, clearAll
  })(LoginForm);
  