import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../../assets/logo.png';

export const Logo = () => {
    return (
        <Image
            style={styles.logo}
            source={logo} />
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