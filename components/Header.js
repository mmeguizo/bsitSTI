import React from 'react';
import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Header({ title, onPressMenu, onPressUser, isMenuOpen }) {
  return (
    <View
      style={{
        height: 56,
        backgroundColor: '#6A00FF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
      }}
    >
      {/* left menu */}
      <Pressable onPress={onPressMenu} style={{ padding: 8 }}>
        <Text style={{ fontSize: 20, color: 'white' }}>
        <MaterialIcons name={isMenuOpen ? "menu-open" : "menu"} size={24} color="black" />
        </Text>
      </Pressable>

      {/* title */}
      <Text
        style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 18,
          fontWeight: '700',
          color: 'white',
        }}
      >
        {title}
      </Text>

      {/* right user icon */}
      <Pressable onPress={onPressUser} style={{ padding: 8 }}>
        <Text style={{ fontSize: 20, color: 'white' }}>
        <FontAwesome name="user-circle" size={24} color="black" />
        </Text>
      </Pressable>
    </View>
  );
}
/*
 // <Text style={{ fontSize: 20, color: 'white' }}>👤</Text>

 <Text style={{ fontSize: 20, color: 'white' }}>☰</Text>
 */
