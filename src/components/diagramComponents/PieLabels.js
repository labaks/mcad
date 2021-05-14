import React from 'react';
import { Text } from 'react-native-svg'

export const PieLabels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
            <Text
                key={index}
                x={pieCentroid[0]}
                y={pieCentroid[1]}
                fill={'white'}
                textAnchor={'middle'}
                alignmentBaseline={'middle'}
                fontSize={20}
            >{data.value == 0 ? '' : data.value + '%'}</Text>
        )
    })
};