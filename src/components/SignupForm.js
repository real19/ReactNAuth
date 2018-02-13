import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, signupUser} from '../actions';



class SignupForm extends Component {

    static navigationOptions = {
        title: 'SIGN-UP',
      };

   onEmailChange(text){
        this.props.emailChanged(text);
   }

   onPasswordChange(text){
    this.props.passwordChanged(text);
    }

    onConfirmPasswordChange(text){
       // this.props.passwordChanged(text);
    }

    onSignUpButtonPress(){
        const {email, password } = this.props;

        this.props.signupUser({email, password});

    }
    onCancelButtonPress(){
        this.props.navigation.goBack();
    }

    renderButton() {
        if (this.props.loading) {
          return <Spinner size="large" />;
        }
    
        return (
          <Button onPress = {this.onSignUpButtonPress.bind(this)}>Sign up </Button>
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
                
                <CardSection>
                    <Input secureTextEntry label="Confirm Password" placeholder="Confirm Password" 
                    onChangeText={this.onConfirmPasswordChange.bind(this)}/>
                </CardSection>
                
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
               
                <CardSection>
                    {this.renderButton()}
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
    emailChanged, passwordChanged, signupUser
  })(SignupForm);
  