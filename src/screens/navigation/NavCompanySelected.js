import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Account } from '../Account';
import { DiagramsList } from '../DiagramsList';

const Drawer = createDrawerNavigator();

const NavCompanySelected = ({ navigation, route }) => {
    const params = route.params;

    useEffect(() => {
        console.log("=====================================================");
        console.log("---Navigation Company selected Loaded---")
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
                    fontFamily: 'SFBold',
                    fontSize: 16,
                    color: '#000'
                },
            }}
            initialRouteName={'diagramsList'}
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
                name="diagramsList"
                options={{
                    drawerLabel: 'Reports',
                    headerTitle: params.selectedCompany.Name
                }}
                initialParams={{
                    token: params.token,
                    url: params.url,
                    companyId: params.selectedCompany.Id,
                    companyName: params.selectedCompany.Name
                }}
                component={DiagramsList}
            />
        </Drawer.Navigator>
    );
};

export default NavCompanySelected;
