import React from 'react'
import { View, Text } from 'react-native'
import { YAxis, XAxis, BarChart, Grid } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

class BarChartExample extends React.PureComponent {

    render() {

        const data = [14, 80, 100, 55]

        // const data = [
        //     {
        //         value: 55,
        //         label: 'AAAAAAAAAAA',
        //     },
        //     {
        //         value: 160,
        //         label: 'Default',
        //     },
        // ]

        // const data2 = [
        //     {
        //         value: 55,
        //         label: 'Default',
        //     },
        //     {
        //         value: 160,
        //         label: 'Default',
        //     },
        // ]



        return (
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 10 }}>

                <BarChart
                    style={{ flex: 1, marginLeft: 0 }}
                    data={[
                        {
                            data,
                            svg: { fill: '#0090d0' },
                        },
                        {
                            data,
                            svg: { fill: '#75c374' },
                        },
                    ]}
                    yAccessor={({ item }) => item.value}
                    horizontal={false}
                    contentInset={{ top: 10, bottom: 20 }}
                    spacing={0.2}
                    gridMin={0}
                >
                    <Grid direction={Grid.Direction.HORIZONTAL} />
                </BarChart>
                <XAxis
                    style={{ marginTop: 10 }}
                    data={data}
                    scale={scale.scaleBand}
                    formatLabel={(value, index) => index}
                    labelStyle={{ color: 'black' }}
                />
            </View>
        )
    }

}

export default BarChartExample