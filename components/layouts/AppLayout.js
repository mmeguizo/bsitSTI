import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import Header from '../Header';
import Sidebar from '../Sidebar';
import UserMenu from '../UserMenu';
import UsersModal from '../UsersModal';
import UsersScreen from '../../screens/UsersScreen';
import {AuthContext} from '../../contexts/AuthContext'


export default function MainLayout({
  title,
  navigation,
  children,
  route,
  name,
}) {
  // accept either a username prop or, if running as a wrapped screen, the route argument
  const names = name ?? route?.params?.name ?? 'Guest';
  const { user, verifyUserSession } = useContext(AuthContext);
  console.log('MainLayout render with name:', { names }, { route });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [usersModalOpen, setUsersModalOpen] = useState(false);
  const [usersScreenOpen, setUsersScreenOpen] = useState(false);

  useEffect(() => {
    const ensureAuthenticated = async () => {
      // If the state lost the user (e.g. refreshed the page on web)
      if (!user || !user.name) {
        // Force a check against Local Storage
        const recoveredUser = await verifyUserSession();
        
        // If local storage is also wiped, kick them out!
        if (!recoveredUser) {
          navigation.replace('Login');
        }
      }
    };
    ensureAuthenticated();
  }, [user, verifyUserSession, navigation]); // Re-run this check if the 'user' state changes

  const openUsersManagementModal = () => {
    setSidebarOpen(false);
    setUsersModalOpen(true);
  };

  const openUsersManagement = () => {
    setSidebarOpen(false);
    setUsersScreenOpen(true);
  };

  const logout = () => {
    setUserMenuOpen(false);
    navigation.replace('Login');
  };


  return (
    <View style={{ flex: 1 }}>
      <Header
        isMenuOpen={sidebarOpen}
        title={title}
        onPressMenu={() => setSidebarOpen(!sidebarOpen)}
        onPressUser={() => setUserMenuOpen((v) => !v)}
      />
      <View style={{ flex: 1, padding: 16 }}>{children}</View>
      <UserMenu
        onProfile={() => {
          setUserMenuOpen(false);
          navigation.navigate('Profile', { name: name });
        }}
        onLogout={logout}
        visible={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
      />
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onHome={() => {
          setSidebarOpen(false);
          navigation.navigate('Home', { name: name });
        }}
        onProfile={() => {
          setSidebarOpen(false);
          navigation.navigate('Profile', { name: name });
        }}
        onUsersManagement={() => {
          setSidebarOpen(false);
          navigation.navigate('Users', { name: name });
        }}
        onUsersManagementModal={openUsersManagementModal}
      />
      <UsersModal
        visible={usersModalOpen}
        onClose={() => setUsersModalOpen(false)}
      />
     
    
    </View>
  );
}
