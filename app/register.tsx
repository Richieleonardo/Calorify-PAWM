import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calorify from '../components/calorify';
import Button from '../components/button';
import { app, autentikasi } from '../firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const db = getFirestore(app); // Initialize database
  const navigation = useNavigation<any>();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  // Harusnya firebase logic disini
  const handleSignUp = async () => {
    try{
      const kredensial = await createUserWithEmailAndPassword(autentikasi, email, password);
      await setDoc(doc(db, 'calorify_users', kredensial.user.uid), {
        Username: username,
        Email: email,
        Password: password,
        CreatedAt: new Date()
      });
      alert('Sign Up Berhasil');
      navigation.navigate('login');
    }
    catch(error){
      alert(error)
    }
  };
  return (
    <View style={styles.container}>
      <Calorify fontSize={33.45} />
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Sign Up</Text>
        <TextInput 
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"#ABABAB"}
        onChangeText = {username => setUsername(username)}
        value={username}
        />
        <TextInput 
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"#ABABAB"}
        onChangeText = {email => setEmail(email)}
        value={email}
        />
        <TextInput 
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"#ABABAB"}
        onChangeText = {password => setPassword(password)}
        value={password}
        />
        <Button 
        width={327} 
        title="Sign Up" 
        onPress={handleSignUp} 
        />
      </View>

      <View style={styles.redirect}>
        <Text style={styles.textBiasa}>Belum punya akun?</Text>
        <Link style={styles.textSignup} href="/login"> Login</Link>
      </View>

      <Image style={styles.image} source={require('./../assets/images/boy_2.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212434',
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: 327,
    height: 44,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#7077A1',
    padding: 10,
  },
  redirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#7077A1',
  },
  textBiasa: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#7077A1',
  },
  textSignup: {
    fontSize: 14,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: '#FF920C',
  },
  image: {
    width: 200,
    height: 300,
  },
});
