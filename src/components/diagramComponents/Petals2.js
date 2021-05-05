import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import Pedals from './pedals';

export class Petals2 extends Component {

    render() {
        return (
            <View>
                <WebView
                    source={{ html: Pedals }}
                    style={styles.container} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'yellow',
        borderWidth: 1,
        height: 200,
        width: "100%"
    }
})