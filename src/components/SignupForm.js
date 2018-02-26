import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, signupUser} from '../actions';
import Icon from 'react-native-fa-icons';


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
        const {email, password, navigation } = this.props;

        this.props.signupUser({email, password, navigation});

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
            <View style = {{ alignContent: 'center', flex:1,
            justifyContent: 'center', backgroundColor:'#d8d8d8'}}> 
  
    <Card>
    <Icon style={{ color: "#d8d8d8", fontSize: 176, alignSelf: 'center', padding:10, }} name='comments' />
                
                <CardSection>
                    <Input label="Email" placeholder="Email" autoCapitalize = "none"
                    onChangeText={this.onEmailChange.bind(this)} value = {this.props.email}/>
                </CardSection>

                <CardSection>
                    <Input secureTextEntry label="Password" placeholder="Password" autoCapitalize = "none"
                    onChangeText={this.onPasswordChange.bind(this)} value = {this.props.password}/>
                </CardSection>
                
                <CardSection>
                    <Input secureTextEntry label="Confirm Password" placeholder="Confirm Password" autoCapitalize = "none"
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
  