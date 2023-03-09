/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useRef, Component, FC, useEffect } from 'react'

// TODO Remove button / go through the entire import dependecy list
import { View, AppState, Linking } from 'react-native';
import RootNavigator from './app/RootNavigator';
import * as RootNavigation from "./app/utils/TypeNavigation";
import { Constants } from './app/utils/Constants';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import StartUpScreen from "./app/pages/StartUpScreen";
// const Stack = createStackNavigator();

const App: FC = () => {
    const TAG = "APP ROUTE";
    var navigator = "";
    // const appState = useRef(AppState.currentState);

    useEffect(() => {
        // RootNavigation.navigate(Constants.connectWallet, {});
        // Linking.getInitialURL().then((url) => {
        //     console.log(TAG, " ===== url : ", url);
        //     if (url) {
        //         handleOpenURL(url)
        //     } else {
        //         console.log(TAG, " ===== url is false");
        //     }
        // }).catch(err => {
        //     console.log(TAG, " ===== url error : ", err)
        // })
        // Linking.addEventListener('url', (event: { url: string }) => handleOpenURL);
    }, []);
    // const handleOpenURL = async (url: string) => {
    //     const routeName = RootNavigation.getCurrentRoute();
    // }

    return (
        <View style={{ flex: 1, flexDirection: "column" }}>
            <RootNavigator ref={nav => { }} />
            {/* <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: true }} options={{ gestureEnabled: true }}>
                    <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
                </Stack.Navigator>
            </NavigationContainer> */}
        </View>
    )
}
export default App;
