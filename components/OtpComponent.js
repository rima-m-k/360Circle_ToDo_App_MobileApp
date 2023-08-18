import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { checkOTP } from '../services/userServices';

const OtpComponent = ({ onNext }) => {
  const [otp, setOTP] = useState('');

  const submitOTP = async () => {
    try {
      const response = await checkOTP({ otp: otp });
      console.log(response);
      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Enter OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={text => setOTP(text)}
          keyboardType="numeric"
        />
        <Button title="Submit OTP" onPress={submitOTP} />
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
  formContainer: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
});

export default OtpComponent;
