import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { registerUser, loginUser } from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';
import { account } from '../appwrite';

export default function RegisterScreen({ navigation }) {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // New phone state

  const handleRegister = async () => {
    try {
      await registerUser(email, password, name, phone); // Pass phone to registerUser
      await loginUser(email, password); // Auto-login after register
      const user = await account.get();
      setUser(user);
    } catch (err) {
      Alert.alert('Registration Failed', err.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} /> {/* New phone input */}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}