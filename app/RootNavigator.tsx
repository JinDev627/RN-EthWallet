import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Constants } from "./utils/Constants.js";
import { navigationRef } from "./utils/TypeNavigation";
import { StartUpScreen } from "./pages/StartUpScreen";
import { ConnectWalletScreen } from "./pages/ConnectWalletScreen";

const Stack = createStackNavigator();

class RootNavigator extends Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator screenOptions={{ headerShown: false }} options={{ gestureEnabled: true }}>
                    <Stack.Screen name={Constants.startUp} component={StartUpScreen} />
                    <Stack.Screen name={Constants.connectWallet} component={ConnectWalletScreen} initialParams={{ address: "", balance: "" }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default RootNavigator;