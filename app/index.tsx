import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TextInput, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Calorify from '../components/calorify';
import Button from '../components/button';
import { autentikasi } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Harusnya firebase logic disini
  const storeData = async (key: string, value: Object) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Data berhasil disimpan');
    } catch (e) {
      console.error('Gagal menyimpan data', e);
    }
  };
  const handleLogin = async () => {
    try{
      const kredensial = await signInWithEmailAndPassword(autentikasi, email, password);
      storeData('email', email);
      console.log(email);
      alert('Login Berhasil');
      navigation.navigate('home');
    }
    catch(error){
      alert(error)
    }
  };

  return (
    <View style={styles.container}>
      <Calorify fontSize={33.45} />
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Login</Text>
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
        title="Login" 
        onPress={handleLogin} 
        />
      </View>

      <View style={styles.redirect}>
        <Text style={styles.textBiasa}>Sudah punya akun?</Text>
        <Link style={styles.textSignup} href="/register"> Sign Up</Link>
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
  }
});
