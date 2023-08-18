import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { changePassword } from '../services/userServices';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const submitPassword = async () => {
    try {
      console.log(password, cPassword);
      const response = await changePassword({ password, cPassword });
      console.log(response);
      navigation.navigate('Login');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <Text style={styles.label}>Retype New Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Retype New Password"
          value={cPassword}
          onChangeText={text => setCPassword(text)}
          secureTextEntry
        />
        <Button title="Change Password" onPress={submitPassword} />
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

export default ResetPassword;
