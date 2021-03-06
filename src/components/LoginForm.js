import React, {Component} from 'react';
import { View, Text , StatusBar} from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser, clearAll} from '../actions';
import SignupForm from './SignupForm';
import Icon from 'react-native-fa-icons';


class LoginForm extends Component {

    componentDidMount() {
        StatusBar.setHidden(true);

     }

    static navigationOptions = {
        title: 'WELCOME',
        headerLeft:null,
    
      };

   onEmailChange(text){
        this.props.emailChanged(text);
   }

   onPasswordChange(text){
    this.props.passwordChanged(text);
    }

    onLoginButtonPress(){
        const {email, password , navigation} = this.props;
        this.props.loginUser({email, password, navigation});
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
           
        <View style = {{ alignContent: 'center', flex:1,
                    justifyContent: 'center', backgroundColor:'#d8d8d8'}}> 
          
            <Card>
            <Icon style={{ color: "#d8d8d8", fontSize: 176, alignSelf: 'center', padding:10, }} name='comments' />
                <CardSection>
                    <Input 
                    label="Email" 
                    placeholder="Email" 
                    autoCapitalize = "none"
                    onChangeText={this.onEmailChange.bind(this)} 
                    value = {this.props.email}/>
                </CardSection>

                <CardSection>
                    <Input 
                    secureTextEntry 
                    label="Password" 
                    autoCapitalize = "none"
                    placeholder="Password" 
                    onChangeText={this.onPasswordChange.bind(this)} 
                    value = {this.props.password}/>
                </CardSection>
                <Text style={styles.errorTextStyle}>{this.props.error}</Text>
                <CardSection>
                     {this.renderButton()}
                </CardSection>
                <CardSection>
                     <Button 
                     onPress = {this.onSignupButtonPress.bind(this)}> 
                     Signup</Button>
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
  