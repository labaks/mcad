import React from 'react';
import { Text, View } from 'react-native';

import { FinancialReports } from '../screens/diagrams/FinancialReports';
import { TopTenCountries } from '../screens/diagrams/TopTenCountries';
import { TopTenRegions } from '../screens/diagrams/TopTenRegions';
import { TrafficShare } from '../screens/diagrams/TrafficShare';

import { TopTenCountriesStartPage } from "../screens/diagrams/TopTenCountriesStartPage";
import { TopTenTargets } from "../screens/diagrams/TopTenTargets";
import { CreditLimitCheck } from '../screens/diagrams/CreditLimitCheck';
import { CallCharts } from '../screens/diagrams/CallCharts';

export const TabContent = ({ chosenTab, token, url, companyId, companyName, navigation, service = 0, dropDownAlert }) => {

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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
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
                dropDownAlert={dropDownAlert}
            />
            break;
        //Start Page tabs:
        case 'Top 10 Countries by Margin':
            content = <TopTenCountriesStartPage
                token={token}
                url={url}
                navigation={navigation}
                criterion={'delta_price'}
                dropDownAlert={dropDownAlert}
            />
            break;
        case 'Top 10 Countries by min.':
            content = <TopTenCountriesStartPage
                token={token}
                url={url}
                navigation={navigation}
                criterion={'duration'}
                dropDownAlert={dropDownAlert}
            />
            break;
        case 'Top 10 Targets':
            content = <TopTenTargets
                token={token}
                url={url}
                navigation={navigation}
                target={'targets'}
                dropDownAlert={dropDownAlert}
            />
            break;
        case 'Top 10 Offers':
            content = <TopTenTargets
                token={token}
                url={url}
                navigation={navigation}
                target={'offers'}
                dropDownAlert={dropDownAlert}
            />
            break;
        case 'Credit Limit Check':
            content = <CreditLimitCheck
                token={token}
                url={url}
                navigation={navigation}
                dropDownAlert={dropDownAlert}
            />
            break;
        case 'Call Charts':
            content = <CallCharts
                token={token}
                url={url}
                navigation={navigation}
                dropDownAlert={dropDownAlert}
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