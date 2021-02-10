import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

import { LoginScreen } from './src/LoginScreen'
import { SignUpScreen } from './src/SignUpScreen';
import { Content } from './src/Content';

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
  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ headerShown: false }} />
            <Stack.Screen
              name="Content"
              component={Content} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      return <AppLoading />
    }
  }
}
