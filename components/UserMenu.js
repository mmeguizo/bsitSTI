import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function UserMenu({ visible, onClose, onProfile, onLogout }) {
  if (!visible) return null;

  return (
    <Pressable
      onPress={onClose}
      style={{
        position: 'absolute',
        top: 56,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 8,
          right: 12,
          width: 160,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 10,
          backgroundColor: 'white',
          overflow: 'hidden',
        }}
      >
        <Pressable onPress={onProfile} style={{ padding: 12 }}>
          <Text>Profile</Text>
        </Pressable>

        <View style={{ height: 1, backgroundColor: '#eee' }} />

        <Pressable onPress={onLogout} style={{ padding: 12 }}>
          <Text style={{ color: '#c00' }}>Logout</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
