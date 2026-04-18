// AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AppState, Platform } from 'react-native'; // Import Platform
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Helper function to verify storage
  const verifyUserSession = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        return parsedUser;
      } else {
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    // 1. Check storage when the app first boots up
    verifyUserSession();

    // 2. MOBILE: Listen for the app coming back from the background
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        verifyUserSession();
      }
    });

    // 3. WEB: Listen for window focus and multi-tab storage changes
    if (Platform.OS === 'web') {
      // Fires when you click back onto the webpage (e.g., after using DevTools)
      window.addEventListener('focus', verifyUserSession);
      // Fires if localStorage is cleared in a different browser tab
      window.addEventListener('storage', verifyUserSession);
    }

    // Cleanup listeners when the component unmounts
    return () => {
      subscription.remove();
      if (Platform.OS === 'web') {
        window.removeEventListener('focus', verifyUserSession);
        window.removeEventListener('storage', verifyUserSession);
      }
    };
  }, [verifyUserSession]);

  const signIn = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, verifyUserSession }}>
      {children}
    </AuthContext.Provider>
  );
}

/*
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user').then((user) => {
      if (user) setUser(JSON.parse(user));
      // if (user) setUser({ user });
    });
  }, []);

  const signIn = async (user) => {
    setUser( user );
    //remove {} to prevent object in the storage 
    // setUser({ user });
    await AsyncStorage.setItem('user', JSON.stringify(user));
    // await AsyncStorage.setItem('user', user);
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
*/
