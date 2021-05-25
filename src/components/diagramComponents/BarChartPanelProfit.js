import React, { useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { BarChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'

import { Panel } from '../Panel'
import { LegendUnit } from './LegendUnit'
import { NoRecords } from '../NoRecords'

let barHeight;

export const BarChartPanelProfit = (props) => {

    const todayColor = '#75c374';
    const yesterdayColor = '#0090d0';
    const numberOfTicks = 4;

    let todayData, yesterdayData, xAxisData, barData;

    useEffect(() => {
        console.log("=====================================================");
        console.log(`---Bar chart loaded---`);
        console.log("props.data", props.data)
    }, [props.data]);

    const findMaxX = () => {
        let max = 0;
        for (var i in props.data) {
            if (props.data[i].today_profit > props.data[i].yesterday_profit) {
                if (props.data[i].today_profit > max) max = props.data[i].today_profit;
            } else {
                if (props.data[i].yesterday_profit > max) max = props.data[i].yesterday_profit;
            }
        }
        return max;
    };

    const createXAxisData = () => {
        let xAxisData = [];
        let max = findMaxX();
        let tick = ~~(max / numberOfTicks);
        for (var i = 0; i <= numberOfTicks; i++) {
            if (i == numberOfTicks) {
                xAxisData.push(max)
            } else {
                xAxisData.push(tick * i);
            }
        }
        return xAxisData;
    };

    xAxisData = createXAxisData();

    barHeight = props.data.length * 20 + 30;

    todayData = props.data.map((obj) => ({ value: obj.today_profit }));
    yesterdayData = props.data.map((obj) => ({ value: obj.yesterday_profit }));
    barData = [
        {
            data: todayData,
            svg: {
                fill: todayColor,
            },
        },
        {
            data: yesterdayData,
            svg: {
                fill: yesterdayColor,
            },
        },
    ];

    return (
        <Panel>
            {props.data.length ?
                <View>
                    <View style={styles.legend}>
                        <LegendUnit
                            color={todayColor}
                            text={'Today'} />
                        <LegendUnit
                            color={yesterdayColor}
                            text={'Yesterday'} />
                    </View>
                    <View style={styles.barWrapper}>
                        <View style={styles.yAxis}>
                            {props.data.map((item) => {
                                return (
                                    <Text
                                        numberOfLines={1}
                                        style={styles.yAxisItem}
                                        key={item.region}
                                    >{item.region}</Text>
                                )
                            })}
                        </View>
                        <View style={{ flex: 1 }}>
                            <BarChart
                                style={{ flex: 1 }}
                                data={barData}
                                horizontal={true}
                                yAccessor={({ item }) => item.value}
                                contentInset={styles.barContentInset}
                                gridMin={0}
                                numberOfTicks={numberOfTicks}
                                spacingInner={0.2}
                                spacingOuter={0.2}
                            >
                                <Grid direction={Grid.Direction.VERTICAL} />
                            </BarChart>
                            <XAxis
                                style={styles.xAxis}
                                contentInset={styles.xAxisContentInset}
                                data={xAxisData}
                                scale={scale.scaleBand}
                                formatLabel={(value, index) => xAxisData[index]}
                                svg={{ fill: 'black' }}
                            />
                        </View>
                    </View>
                </View>
                :
                <NoRecords/>
            }
        </Panel>
    )
}

const styles = StyleSheet.create({
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10
    },
    barWrapper: {
        flexDirection: 'row',
        height: barHeight,
    },
    yAxis: {
        paddingVertical: 5,
        paddingRight: 5,
        marginBottom: 20,
        flex: 1,
    },
    yAxisItem: {
        fontFamily: 'SF',
        fontSize: 13,
        lineHeight: 20,
        textAlign: 'right'
    },
    xAxis: {
        marginLeft: -10,
        marginRight: -10,
        height: 15,
        marginTop: 5
    },
    yAxisContentInset: {
        top: 5,
        bottom: 5
    },
    xAxisContentInset: {
        left: -10,
        right: 0
    },
    barContentInset: {
        top: 5,
        bottom: 5,
        right: 5
    }
})
