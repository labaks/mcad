import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Content } from './Content';
import { SecondScreen } from './SecondScreen';
import { Account } from './Account';

const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = ({ navigation, route }) => {
    console.log("======================");
    console.log("---Drawer Nawigation Loaded---")
    console.log("-params received: ", route.params);
    let params = route.params;
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
            screenOptions={{ headerShown: true }}>
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
                component={Account} />
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
                component={Content} />
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
                component={SecondScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigatorRoutes;
