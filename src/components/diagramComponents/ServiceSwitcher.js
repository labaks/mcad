import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export const ServiceSwithcer = () => {
    return (
        <View>
            <TouchableOpacity
                style={[styles.btn, interval == 'yesterday' && styles.activeBtn]}
                activeOpacity={.5}
                onPress={() => setInterval("yesterday")}>
                <Text>Yesterday</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btn, interval == 'today' && styles.activeBtn]}
                activeOpacity={.5}
                onPress={() => setInterval("today")}>
                <Text>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btn, service == 'voice' && styles.activeBtn]}
                activeOpacity={.5}
                onPress={() => setService("voice")}>
                <Text>Voice</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btn, service == 'sms' && styles.activeBtn]}
                activeOpacity={.5}
                onPress={() => setService("sms")}>
                <Text>SMS</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
})