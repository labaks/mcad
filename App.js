import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import DrawerNavigationRoutes from './src/screens/DrawerNavigationRoutes';
import { StyleSheet, View, BackHandler, Alert } from 'react-native';

const Stack = createStackNavigator();

let customFonts = {
  'SF': require('./assets/fonts/SFProDisplay.ttf'),
  'Dessau': require('./assets/fonts/Dessau.ttf'),
}
export default class App extends React.Component {
  state = {
    fontsLoaded: false
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  // backAction = () => {
  //   Alert.alert("Hold on!", "Are you sure you want to go back?", [
  //     { text: "Cancel", onPress: () => null, style: "cancel" },
  //     { text: "YES", onPress: () => BackHandler.exitApp() }
  //   ]);
  //   return true;
  // }


  componentDidMount() {
    this._loadFontsAsync();
    // this.backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress", function () { return true }
    // )
  }

  componentWillUnmount() {
    // this.backHandler.remove();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }} />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }} />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }} />
              <Stack.Screen
                name="DrawerNavigationRoutes"
                component={DrawerNavigationRoutes}
                options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      )
    } else {
      return <AppLoading />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
