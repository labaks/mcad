import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { SplashScreen } from './src/screens/SplashScreen';
import NavChooseCompany from './src/screens/navigation/NavChooseCompany';
import NavCompanySelected from './src/screens/navigation/NavCompanySelected';
import { SafeAreaView, StyleSheet } from 'react-native';
import { TopTenRegionsIn } from './src/screens/diagrams/TopTenRegionsIn';

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

  componentDidMount() {
    this._loadFontsAsync();
  }

  componentWillUnmount() {
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView style={styles.container}>
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
                name="NavChooseCompany"
                component={NavChooseCompany}
                options={{ headerShown: false }} />
              <Stack.Screen
                name="NavCompanySelected"
                component={NavCompanySelected}
                options={{ headerShown: false }} />
              <Stack.Screen
                name="TopTenRegionsIn"
                component={TopTenRegionsIn}
                options={{ headerShown: true }} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
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
