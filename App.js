import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('./assets/loginBg.png')}
          style={styles.bgImage}>
          <Image
            style={styles.logo}
            source={require('./assets/logo.png')} />
          <View style={styles.mainText}>
            <Text style={styles.welcomeBackText}>Welcome back,</Text>
            <Text>Sign in to continue</Text>
          </View>
          <View style={styles.inputView} >
            <Text style={styles.inputLabel}>Login</Text>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ email: text })} />
          </View>
          <View style={styles.inputView} >
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#003f5c"
              onChangeText={text => this.setState({ password: text })} />
          </View>
          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.newUserLink}>
            <Text style={styles.forgot}>New user?</Text>
            <Text style={styles.newUserLinkColored}>Sign up</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    resizeMode: 'cover',
    marginBottom: 40
  },
  mainText: {
    width: '80%',
    marginBottom: 30
  },
  welcomeBackText: {
    fontSize: 26,
    color: 'green',
  },
  inputView: {
    width: '80%',
    marginBottom: 10
  },
  inputLabel: {
    color: '#999'
  },
  inputText: {
    fontSize: 16,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10
  },
  loginBtn: {
    width: "80%",
    backgroundColor: '#282C34',
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10
  },
  loginBtnText: {
    color: 'white',
    fontSize: 16
  },
  newUserLink: {
    flexDirection: 'row'
  },
  newUserLinkColored: {
    marginLeft: 5,
    color: 'green'
  }
});