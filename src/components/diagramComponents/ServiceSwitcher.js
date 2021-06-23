import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export const ServiceSwithcer = (props) => {
    return (
        <View style={styles.switcherWrapper}>
            <View>
                <TouchableOpacity
                    style={[
                        styles.btn,
                        props.interval === 'yesterday' && styles.activeBtn,
                        { borderTopLeftRadius: 10 }
                    ]}
                    activeOpacity={.5}
                    onPress={() => props.setInterval("yesterday")}>
                    <Text
                        style={[
                            styles.btnText,
                            props.interval === 'yesterday' && styles.activeBtnText
                        ]}>Yesterday</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.btn,
                        props.interval === 'today' && styles.activeBtn,
                        { borderBottomLeftRadius: 10 }
                    ]}
                    activeOpacity={.5}
                    onPress={() => props.setInterval("today")}>
                    <Text
                        style={[
                            styles.btnText,
                            props.interval === 'today' && styles.activeBtnText
                        ]}>Today</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={[
                        styles.btn,
                        props.service === 'voice' && styles.activeBtn,
                        { borderTopRightRadius: 10 }
                    ]}
                    activeOpacity={.5}
                    onPress={() => props.setService("voice")}>
                    <Text
                        style={[
                            styles.btnText,
                            props.service === 'voice' && styles.activeBtnText
                        ]}>Voice</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.btn,
                        props.service === 'sms' && styles.activeBtn,
                        { borderBottomRightRadius: 10 }
                    ]}
                    activeOpacity={.5}
                    onPress={() => props.setService("sms")}>
                    <Text
                        style={[
                            styles.btnText,
                            props.service === 'sms' && styles.activeBtnText
                        ]}>SMS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    switcherWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
    },
    btn: {
        width: 150,
        borderColor: '#4A6E49',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
        margin: 1
    },
    btnText: {
        color: '#666',
        fontFamily: 'SFBold'
    },
    activeBtn: {
        backgroundColor: '#4A6E49',
    },
    activeBtnText: {
        color: 'white'
    }
});