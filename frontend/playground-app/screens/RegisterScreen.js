import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser, setProfile } = useContext(AuthContext);

 const handleRegister = async () => {
  try {
    if (!name.trim()) throw new Error("Name is required.");
    if (!email.includes('@') || !email.includes('.')) throw new Error("Invalid email.");
    if (password !== confirmPassword) throw new Error("Passwords don't match.");
    if (password.length < 6) throw new Error("Password must be at least 6 characters.");

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const profileData = {
      fullName: name,
      email,
      avatar: '',
      about: '',
      followers: 0,
      following: 0,
    };

    await setDoc(doc(db, 'users', user.uid), profileData);

    // Update auth context properly
    setUser(user);            // From AuthContext
    setProfile(profileData);  // From AuthContext

    Alert.alert('Success', 'Registration complete!');
    navigation.replace('Login');

  } catch (error) {
    console.error('❌ Registration error:', error);

    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('Email Exists', 'This email is already registered. Please login.');
    } else {
      Alert.alert('Registration Error', error.message);
    }
  }
};


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/callout.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          onChangeText={setName}
          value={name}
          style={styles.input}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          style={styles.input}
          placeholder="Re-enter your password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Button title="Login" onPress={() => navigation.replace('Login')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: 120,
    marginBottom: 30,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
});
