import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Account } from '../Account';
import { ChooseCompanyScreen } from '../ChooseCompanyScreen';

const Drawer = createDrawerNavigator();

const NavChooseCompany = ({ navigation, route }) => {
    const params = route.params;

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Navigation Choose Company Loaded---")
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
            initialRouteName={'chooseVoiceCompany'}
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
                name="chooseVoiceCompany"
                options={{
                    drawerLabel: 'Voice Diagrams',
                    headerTitle: 'Voice Diagrams'
                }}
                initialParams={{
                    token: params.token,
                    url: params.url,
                    service: 1
                }}
                component={ChooseCompanyScreen}
            />
            <Drawer.Screen
                name="chooseSMSCompany"
                options={{
                    drawerLabel: 'SMS Diagrams',
                    headerTitle: 'SMS Diagrams'
                }}
                initialParams={{
                    token: params.token,
                    url: params.url,
                    service: 2
                }}
                component={ChooseCompanyScreen}
            />
        </Drawer.Navigator>
    );
};

export default NavChooseCompany;
