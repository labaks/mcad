import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const Logo = () => {
    return (
        <Image
            style={styles.logo}
            source={require('./../../assets/logo.png')} />
    )
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'cover',
        marginBottom: 40,
        width: 71,
        height: 70
    }
})