import React from 'react';
import { Text } from 'react-native-svg'

export const PieLabels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        let x = pieCentroid[0];
        let y = pieCentroid[1];
        const text = data.value === 0 || data.value !== data.value ? '' : data.value + '%';
        if (data.value < 11) x += 30;
        if (data.value == 100) y -= 50;
        return (
            <Text
                key={index}
                x={x}
                y={y}
                fill={'white'}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={20}
            >{text}</Text>
        )
    })
};