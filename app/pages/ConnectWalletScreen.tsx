import { Component, FC, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    BackHandler,
    Platform,
    Alert,
    Clipboard,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNExitApp from 'react-native-exit-app';
import { globalStyle } from "../styles/GlobalStyle";
import ProgressIndicator from "../components/ProgressIndicator";
import { Colors } from "../styles/Colors";
import { Constants, encryptInfo } from "../utils/Constants";

var TAG = "ConnectWalletScreen";
interface IProps {
    route: any
}
const { height } = Dimensions.get('window');


export const ConnectWalletScreen: FC<IProps> = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");

    const saveAddress = () => {
        Clipboard.setString(address);
        Alert.alert("Address is saved!");
    }

    const handleClose = () => {
        if (Platform.OS == "ios") {
            RNExitApp.exitApp();
        } else {
            BackHandler.exitApp();
        }
    }

    const handleDisConnect = async () => {
        await AsyncStorage.removeItem(encryptInfo.key);
        Alert.alert("Success!", "Delete Saved Wallet Information!", [
            {
                text: "OK", onPress: () => {
                    handleClose()
                }
            },
        ], { cancelable: false });
    }

    useEffect(() => {
        if (props.route != undefined && props.route.params != undefined) {
            console.log(TAG, " ===  props : ", props.route.params);
            if (props.route.params.address != undefined && props.route.params.address != null) {
                setAddress(props.route.params.address);
            }
            if (props.route.params.balance != undefined && props.route.params.balance != null) {
                setBalance(props.route.params.balance);
            }
        }
        setIsLoading(false);
    }, [])

    return (
        <View style={globalStyle.container}>
            {
                isLoading && <ProgressIndicator />
            }
            {
                <View style={globalStyle.container}>
                    <View style={globalStyle.head_title_area}>
                        <Text style={globalStyle.head_title}>{Constants.connectWalletHead}</Text>
                    </View>
                    <View style={styles.input_view_area}>
                        <Text style={styles.input_title}>{"Wallet Address"}</Text>
                        <TouchableOpacity style={styles.input_view} onPress={() => { saveAddress() }}>
                            <TextInput id={"address"} style={styles.input_text} value={address} editable={false}></TextInput>
                        </TouchableOpacity>
                        <Text style={styles.input_title}>{"Balance"}</Text>
                        <View style={styles.input_view}>
                            <TextInput id={"balance"} style={styles.input_text} value={balance} editable={false}></TextInput>
                        </View>
                    </View>
                    <View style={styles.button_area}>
                        <TouchableOpacity style={globalStyle.text_button_bg} onPress={() => { handleClose() }}>
                            <Text style={[globalStyle.text_button, globalStyle.font_bold]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button_area}>
                        <TouchableOpacity style={[globalStyle.text_button_bg]} onPress={() => { handleDisConnect() }}>
                            <Text style={[globalStyle.text_button, globalStyle.font_bold]}>DisConnect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    input_view_area: {
        marginTop: 20,
        marginHorizontal: "5%",
        height: height * 0.45,
        width: "90%",
        // backgroundColor: Colors.white,
    },
    input_view: {
        backgroundColor: Colors.white,
        height: 36,
        width: "100%",
        borderRadius: 10,
    },
    input_title: {
        color: Colors.white,
        height: 50,
        marginTop: 60,
        fontSize: 30,
        padding: 5
    },
    input_text: {
        color: Colors.black,
        fontSize: 25,
        padding: 5,
    },
    button_area: {
        marginTop: height * 0.03,
        marginHorizontal: "15%",
        height: 40,
        borderRadius: 10,
        width: "70%",
    }
});
