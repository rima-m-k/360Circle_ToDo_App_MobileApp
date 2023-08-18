import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { login } from '../services/userServices';

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');


  const handleInputChange = (fieldName, text) => {
    setFormData({
      ...formData,
      [fieldName]: text,
    });
  };

  const handleSubmit = () => {

    login(formData)
      .then(res => { 
        AsyncStorage.setItem('user', JSON.stringify(res.data.user))
          .then(() => {
            // Navigate to the ToDo screen
            navigation.navigate('ToDo');
          })
          .catch((storageErr) => {
          });
        setFormData({
          email: '',
          password: '',
        });
      })
      .catch(err => {
      })
    // Handle form submission using the formData state
  };

  const goToSignup = () => {
    navigation.navigate('Signup'); 
   };
   const goToforgotPassword = () => {
    navigation.navigate('Forgot-password'); 
   };

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToSignup}>
        <Text style={styles.linkText}>signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToforgotPassword}>
        <Text style={styles.linkText}>forgot Password</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  box1: { width: '100%', maxWidth: 400, padding: 16, borderRadius: 8, backgroundColor: '#fff', elevation: 4 },
  heading: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 12 },
  loginButton: { backgroundColor: 'black', paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 8 },
  linkText: { color: 'blue', marginTop: 8  },

});

export default Login;
