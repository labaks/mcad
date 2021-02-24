import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Content } from './Content';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({ navigation }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Content"
                    component={Content}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// const settingScreenStack = ({ navigation }) => {
//     return (
//         <Stack.Navigator
//             initialRouteName="SettingsScreen"
//             screenOptions={{
//                 headerLeft: () => (
//                     <NavigationDrawerHeader navigationProps={navigation} />
//                 ),
//                 headerStyle: {
//                     backgroundColor: '#307ecc', //Set Header color
//                 },
//                 headerTintColor: '#fff', //Set Header text color
//                 headerTitleStyle: {
//                     fontWeight: 'bold', //Set Header text style
//                 },
//             }}>
//             <Stack.Screen
//                 name="SettingsScreen"
//                 component={SettingsScreen}
//                 options={{
//                     title: 'Settings', //Set Header Title
//                 }}
//             />
//         </Stack.Navigator>
//     );
// };

const DrawerNavigatorRoutes = (props) => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#cee1f2',
                color: '#cee1f2',
                itemStyle: { marginVertical: 5, color: 'white' },
                labelStyle: {
                    color: '#d8d8d8',
                },
            }}
            screenOptions={{ headerShown: false }}>
            <Drawer.Screen
                name="homeScreenStack"
                options={{ drawerLabel: 'Home Screen' }}
                component={homeScreenStack}
            />
            {/* <Drawer.Screen
                name="settingScreenStack"
                options={{ drawerLabel: 'Setting Screen' }}
                component={settingScreenStack}
            /> */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigatorRoutes;
