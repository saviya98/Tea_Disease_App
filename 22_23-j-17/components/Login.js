import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { firebase } from '../global/firebase';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Login</Text>
      <View style={{ fontWeight: 'bold', fontSize: 26 }}>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        onPress={() => loginUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 22 }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}
        style={{ marginTop: 20 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Register Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // added to center content
    marginTop: 10
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: 'center'
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    fontSize: 20,
    backgroundColor: "#026efd",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  }
});

export default Login;
