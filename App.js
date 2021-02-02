import 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

import { LoginScreen } from './src/LoginScreen'
import { SignUpScreen } from './src/SignUpScreen';

const Stack = createStackNavigator();

let customFonts = {
  'SF': require('./assets/fonts/SFProDisplay.ttf')
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
          </Stack.Navigator>
          <Text style={{ fontFamily: 'SF' }}>Some text</Text>
        </NavigationContainer>
      )
    } else {
      return <AppLoading />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})