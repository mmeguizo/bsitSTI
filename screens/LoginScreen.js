import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, Platform } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AppButton from '../components/AppButton';
import LoginLayout from '../components/layouts/LoginLayout';

// 1. We remove the v9 imports and bring in the core firebase object for the Auth Provider
import { firebase, auth } from '../firebaseConfig';
import { AuthContext } from '../contexts/AuthContext';

GoogleSignin.configure({
  webClientId: '77629757222-q1sr4r45efiqt4ate8s5s0eqev8ptpvh.apps.googleusercontent.com', 
  // webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  
  const { signIn } = useContext(AuthContext);

  const handleGoogleLogin = async () => {
    // 🌐 IF WE ARE ON THE WEB
    if (Platform.OS === 'web') {
      try {
        // v8 syntax for Auth Provider
        const provider = new firebase.auth.GoogleAuthProvider(); 
        
        // v8 syntax for Popup Sign In
        const result = await auth.signInWithPopup(provider);

        console.log('Web Google auth success:', result.user);
        
        signIn({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
        });
        navigation.replace('Home');
      } catch (error) {
        console.log('Web Google sign-in error:', error);
        window.alert(`Google Auth failed: ${error.message}`);
      }
      return; 
    }

    // 📱 IF WE ARE ON A PHONE (Android/iOS)
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      
      // v8 syntax for Google Credential
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
      
      // v8 syntax for Sign In With Credential
      const { user: firebaseUser } = await auth.signInWithCredential(googleCredential);

      console.log('Mobile Google auth success:', { firebaseUser });
      
      signIn({
        uid: firebaseUser.uid, // Fixed variable reference here
        email: firebaseUser.email,
        name: firebaseUser.displayName, // Fixed variable reference here
      });
      navigation.replace('Home');

    } catch (error) {
      console.log('Mobile Google sign-in error:', error);
      Alert.alert('Google Authentication failed', error.message);
    }
  };

  const handleLogin = () => {
    if (!user.trim() || !pass.trim()) {
      Alert.alert('Oops', 'Please fill in all fields');
      return;
    }
    // v8 syntax for Email/Password Sign In
    auth.signInWithEmailAndPassword(user, pass)
      .then(({ user: firebaseUser }) => {
        console.log('Firebase auth success:', { firebaseUser });
        navigation.replace('Home');
        signIn({
          uid: firebaseUser.uid ?? 1,
          email: firebaseUser.email,
          name: firebaseUser.email.split('@')[0],
        });
      
      })
      .catch((err) => {
        console.log('Firebase auth error:', err.message);
        Alert.alert('Authentication failed', err.message);
        if (Platform.OS === 'web') window.alert(`Authentication failed: ${err.message}`);
      });
  };

  return (
    <LoginLayout>
      <TextInput
        placeholder="Email"
        value={user}
        keyboardType="email-address"
        onChangeText={setUser}
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={{ borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 15 }}
      />

      <AppButton title="Sign in" onPress={handleLogin} />
      <AppButton title="Sign with Google" onPress={handleGoogleLogin} />
      <Text style={{ opacity: 0.6, marginTop: 10 }}>Try: testers@testers.com / testers for credentials</Text>
    </LoginLayout>
  );
}