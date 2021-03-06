import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

export const PasswordField = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPass, setShowPass] = useState(false);

    return (
        <View style={styles.inputView}>
            <Text style={[styles.inputLabel, isFocused && styles.focused]}>Password</Text>
            <View style={[styles.inputWrapper, isFocused && styles.focused]}>
                <TextInput
                    secureTextEntry={!showPass}
                    style={styles.inputText}
                    onFocus={() => setIsFocused(true)}
                    autoCompleteType='off'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChange={(event) =>
                        props.handleFormValueChange(
                            props.formKey,
                            event.nativeEvent.text
                        )
                    }
                    {...props.textInputProps} />
                <Icon
                    style={styles.icon}
                    name={showPass ? 'eye' : 'eye-off'}
                    onPress={() => setShowPass(!showPass)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        width: '100%',
        marginBottom: 10
    },
    inputLabel: {
        color: '#E4E4E4',
        fontFamily: 'SF'
    },
    inputWrapper: {
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    inputText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'SF',
    },
    icon: {
        alignSelf: 'flex-end',
        color: '#4B4B52'
    },
    focused: {
        color: '#4B4B52',
        borderBottomColor: '#4B4B52'
    }
})