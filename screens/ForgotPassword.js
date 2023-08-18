import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EmailComponent from '../components/EmailComponent';
import OtpComponent from '../components/OtpComponent';
import ResetPassword from '../components/ResetPassword';

const ForgotPassword = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => {
    setCurrentStep(prev => prev + 1);
  };

  const displayStep = step => {
    switch (step) {
      case 1:
        return <EmailComponent onNext={next} />;
      case 2:
        return <OtpComponent onNext={next} />;
      case 3:
        return <ResetPassword  />;
      default:
        return <EmailComponent onNext={next} />;
    }
  };


  const goToSignup = () => {
    navigation.navigate('Signup'); 
   };
   const goToLogin = () => {
    navigation.navigate('Login'); 
   };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Forgot Password</Text>
        <Text >
        {displayStep(currentStep)}
        </Text>
          

        <View style={styles.linksContainer}>

          <TouchableOpacity style={styles.link} onPress={() => {goToSignup}}>
            <Text style={styles.linkText}>signup</Text>
          </TouchableOpacity>
          <Text style={styles.linkSeparator}>{" | "}</Text>
          <TouchableOpacity style={styles.link} onPress={() => {goToLogin}}>
            <Text style={styles.linkText}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    // width: '80%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  
  link: {
    marginRight: 8,
  },
  linkText: {
    color: 'blue',
    fontSize: 14,
  },
  linkSeparator: {
    fontSize: 14,
  },
});

export default ForgotPassword;
