import React from 'react';
import { Text, View } from 'react-native';

import { FinancialReports } from '../screens/diagrams/FinancialReports';
import { TopTenCountries } from '../screens/diagrams/TopTenCountries';
import { TopTenRegions } from '../screens/diagrams/TopTenRegions';
import { TrafficShare } from '../screens/diagrams/TrafficShare';

import { TopTenCountriesStartPage } from "../screens/diagrams/TopTenCountriesStartPage";

export const TabContent = ({ chosenTab, token, url, companyId, companyName, navigation, service = 0 }) => {

    let content = <Text></Text>;

    switch (chosenTab) {
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
        //Start Page tabs:
        case 'Top 10 Countries by Margin':
            content = <TopTenCountriesStartPage
                token={token}
                url={url}
                navigation={navigation}
                criterion={'delta_price'}
            />
            break;
        case 'Top 10 Countries by min.':
            content = <TopTenCountriesStartPage
                token={token}
                url={url}
                navigation={navigation}
                criterion={'duration'}
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