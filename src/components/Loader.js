import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Loader = (props) => {
    return (
        <View style={[styles.activityIndicatorWrapper, props.loading && styles.active]}>
            <ActivityIndicator
                animating={props.loading}
                color="#4A6E49"
                size="large" />
        </View>
    )
};

const styles = StyleSheet.create({
    activityIndicatorWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '40%',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'none',
        height: 50,
    },
    active: {
        display: 'flex'
    }
});