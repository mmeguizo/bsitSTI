import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';


import MainLayout from '../components/layouts/AppLayout';
import { AuthContext } from '../contexts/AuthContext';
export default function HomeScreen({ navigation, route }) {
  // const username = route?.params?.username || 'Guest';
  const { user } = useContext(AuthContext);


  return (
    <MainLayout title="Home" navigation={navigation} name={user?.name}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        Welcome, {user?.name}!
      </Text>
      <Text>This is the Home screen layout...</Text>
    </MainLayout>
  );
}


