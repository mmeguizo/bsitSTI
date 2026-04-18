import React, { useState, useContext } from 'react';
import MainLayout from '../components/layouts/AppLayout';
import { AuthContext } from '../contexts/AuthContext';
import { DataTable, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { View, Text, Alert } from 'react-native';
import { db } from '../firebaseConfig'; // ✅ keep this

// ❌ Remove this line entirely:
// import { collection, getDocs } from 'firebase/firestore';

export default function UsersScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = useState(true);

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, users.length);

    React.useEffect(() => {
        setLoading(true);
        const getUsers = async () => {
            try {
                // ✅ v8 syntax — chain directly on db
                const usersSnapshot = await db.collection('users_basic').get();
                const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(usersList);
            } catch (error) {
                Alert.alert('Error', error.message);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
        setPage(0);
    }, [itemsPerPage]);

    return (
        <MainLayout title="Home" navigation={navigation} name={user?.name}>

            <View style={{ padding: 16, gap: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                    Users Management (Screen)
                </Text>
                {loading ?
                    (
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title numeric>Email</DataTable.Title>
                                <DataTable.Title numeric>First Name</DataTable.Title>
                                <DataTable.Title numeric>Last Name</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row style={{ justifyContent: 'center' }}>
                                <DataTable.Cell style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator animating={loading} color={MD2Colors.red800} size="large" style={{ marginTop: 20 }} />
                                </DataTable.Cell>
                            </DataTable.Row>

                        </DataTable>
                    )
                    :
                    users.length === 0 ?
                        (<DataTable>
                            <DataTable.Header>
                                <DataTable.Title numeric>Email</DataTable.Title>
                                <DataTable.Title numeric>First Name</DataTable.Title>
                                <DataTable.Title numeric>Last Name</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row >
                                <Text>
                                    No users yet
                                </Text>
                            </DataTable.Row>
                        </DataTable>) :

                        (<DataTable>
                            <DataTable.Header>
                                <DataTable.Title numeric>Email</DataTable.Title>
                                <DataTable.Title numeric>First Name</DataTable.Title>
                                <DataTable.Title numeric>Last Name</DataTable.Title>
                            </DataTable.Header>

                            {users.slice(from, to).map((user : any) => (
                                <DataTable.Row key={user.email}>
                                    <DataTable.Cell numeric>{user.email}</DataTable.Cell>
                                    <DataTable.Cell numeric>{user.firstname}</DataTable.Cell>
                                    <DataTable.Cell numeric>{user.lastname}</DataTable.Cell>
                                </DataTable.Row>
                            ))}

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(users.length / itemsPerPage)}
                                onPageChange={(page) => setPage(page)}
                                label={`${from + 1}-${to} of ${users.length}`}
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                showFastPaginationControls
                                selectPageDropdownLabel={'Rows per page'}
                            />
                        </DataTable>)
                }
            </View>
        </MainLayout>
    );





}