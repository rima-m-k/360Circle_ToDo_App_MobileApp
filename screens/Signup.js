import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { signup } from '../services/userServices';

const Signup = ({navigation}) => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        cpassword: "",
    });
    const [error, setError] = useState('');
    const handleInputChange = (fieldName, text) => {
        setFormData({
            ...formData,
            [fieldName]: text,
        });
    };

    const handleSubmit = () => {
        // Handle form submission using the formData state
        signup(formData)
        .then(res => {
          AsyncStorage.setItem('user', JSON.stringify(res.data.user))
            .then(() => {
              // Navigate to the ToDo screen
              navigation.navigate('ToDo');
            })
            
          setFormData({
            email: '',
            password: '',
          });
        })
        .catch(err => {
        })
    };

    const goToLogin = () => {
        navigation.navigate('Login'); 
      };
    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.heading}>Signup</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChangeText={(text) => handleInputChange('fullName', text)}
                />
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
                 <TextInput
                    style={styles.input}
                    placeholder=" Confirm Password"
                    value={formData.cpassword}
                    onChangeText={(text) => handleInputChange('cpassword', text)}
                    secureTextEntry
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Signup</Text>
                </TouchableOpacity>

                
        <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.linkText}>login</Text>
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

export default Signup;
