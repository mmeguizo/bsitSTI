import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function Sidebar({
  visible,
  onClose,
  onHome,
  onProfile,
  onUsersManagementModal,
  onUsersManagement,
}) {
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
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}
    >
      {/* stop closing when clicking inside panel */}
      <Pressable
        onPress={() => {
          console.log('Clicked inside sidebar, not closing');
        }}
        style={{
          width: 220,
          height: '100%',
          backgroundColor: 'white',
          borderRightWidth: 1,
          borderRightColor: '#ddd',
          padding: 12,
          gap: 10,
        }}
      >
        <Text style={{ fontWeight: '700', fontSize: 16 }}>Menu</Text>

        <Pressable onPress={onHome} style={{ paddingVertical: 10 }}>
          <Text>🏠 Home</Text>
        </Pressable>

        <Pressable onPress={onProfile} style={{ paddingVertical: 10 }}>
          <Text>👤 Profile Screen</Text>
        </Pressable>

        <Pressable onPress={onUsersManagementModal} style={{ paddingVertical: 10 }}>
          <Text>🧑‍💼 Users Management (Modal)</Text>
        </Pressable>

        <Pressable onPress={onUsersManagement} style={{ paddingVertical: 10 }}>
          <Text>🧑‍💼 Users Crud (Screen)</Text>
        </Pressable>


      </Pressable>
    </Pressable>
  );
}
