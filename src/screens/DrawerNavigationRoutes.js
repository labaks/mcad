import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Content } from './Content';
import { SecondScreen } from './SecondScreen';
import { Account } from './Account';
import { Reports } from './Reports';

const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = ({ navigation, route }) => {
    let params = route.params;

    useEffect(() => {
        console.log("======================");
        console.log("---Drawer Nawigation Loaded---")
        console.log("-params received: ", route.params);
    }, [params])

    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#575757',
                color: 'red',
                itemStyle: { marginVertical: 5, color: 'green' },
                labelStyle: {
                    color: '#575757',
                },
            }}
            screenOptions={{
                headerShown: true,
                headerTitleAlign: 'center',
                headerStyle: {
                    elevation: 0, // shadow under the header (android)
                    shadowOpacity: 0 // shadow under the header (ios)
                },
                headerTitleStyle: {
                    fontFamily: 'SF',
                    fontSize: 16,
                    color: '#000'
                },
            }}
            initialRouteName={'reports'}
        >
            <Drawer.Screen
                name="account"
                options={{
                    drawerLabel: 'Account',
                    headerTitle: 'Account'
                }}
                initialParams={{
                    token: params.token,
                    url: params.url
                }}
                component={Account}
            />
            <Drawer.Screen
                name="reports"
                options={{
                    drawerLabel: 'Reports',
                    headerTitle: 'Reports'
                }}
                initialParams={{
                    token: params.token,
                    url: params.url
                }}
                component={Reports}
            />
            <Drawer.Screen
                name="firstScreen"
                options={{
                    drawerLabel: 'First Screen',
                    headerTitle: 'First Screen'
                }}
                initialParams={{
                    token: params.token,
                    url: params.url
                }}
                component={Content}
            />
            <Drawer.Screen
                name="secondScreen"
                options={{
                    drawerLabel: 'Second Screen',
                    headerTitle: 'Second Screen'
                }}
                initialParams={{
                    token: params.token,
                    url: params.url
                }}
                component={SecondScreen}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigatorRoutes;
