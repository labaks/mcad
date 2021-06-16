import React from 'react';
import { Text, View } from 'react-native';

import { FinancialReports } from '../screens/diagrams/FinancialReports';
import { TopTenCountries } from '../screens/diagrams/TopTenCountries';
import { TopTenRegions } from '../screens/diagrams/TopTenRegions';
import { TrafficShare } from '../screens/diagrams/TrafficShare';

export const TabContent = (props) => {

    const token = props.token,
        url = props.url,
        companyId = props.companyId,
        companyName = props.companyName,
        navigation = props.navigation,
        service = props.service;

    let content = <Text></Text>;

    switch (props.chosenTab) {
        case 'Top 10 Regions In':
            content = <TopTenRegions
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'in'}
                service={service}
            />
            break;
        case 'Top 10 Regions Out':
            content = <TopTenRegions
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'out'}
                service={service}
            />
            break;
        case 'Top 10 Regions In, $':
            content = <TopTenRegions
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'in'}
                profit={true}
                service={service}
            />
            break;
        case 'Top 10 Regions Out, $':
            content = <TopTenRegions
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'out'}
                profit={true}
                service={service}
            />
            break;
        case 'Top 10 Countries In':
            content = <TopTenCountries
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'in'}
                service={service}
            />
            break;
        case 'Top 10 Countries Out':
            content = <TopTenCountries
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'out'}
                service={service}
            />
            break;
        case 'Traffic Share In':
            content = <TrafficShare
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'in'}
                companyName={companyName}
                service={service}
            />
            break;
        case 'Traffic Share Out':
            content = <TrafficShare
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                direction={'out'}
                companyName={companyName}
                service={service}
            />
            break;
        case 'Financial Reports Today':
            content = <FinancialReports
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                period={"today"}
                service={service}
            />
            break;
        case 'Financial Reports Yesterday':
            content = <FinancialReports
                token={token}
                url={url}
                companyId={companyId}
                navigation={navigation}
                period={"yesterday"}
                service={service}
            />
            break;
        default:
            break;
    }
    return (
        <View>
            {content}
        </View>
    );
}