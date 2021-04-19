import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const Panel = ({ children }) => {
    return (
        <View style={styles.panel}>
            {children}
        </View>
    )
}

// Panel.propTypes = {
//     children: PropTypes.node.isRequired,
// }

const styles = StyleSheet.create({
    panel: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: .2,
        borderColor: '#e4e4e4',
        padding: 10,
        alignSelf: 'stretch',
        shadowColor: "#e4e4e4",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: .25,
        shadowRadius: 3.5,
        elevation: 3
    },
})