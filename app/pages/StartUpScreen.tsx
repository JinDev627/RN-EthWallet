import { FC, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Alert,
} from "react-native";
import Aes from 'react-native-aes-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { globalStyle } from "../styles/GlobalStyle";
import ProgressIndicator from "../components/ProgressIndicator";
import { Colors } from "../styles/Colors";
import { Constants, networkProviders, encryptInfo } from "../utils/Constants";

var TAG = "StartUpScreen";
const { width, height } = Dimensions.get('window');

export const StartUpScreen: FC = () => {

    const navigator = useNavigation();
    const provider = new JsonRpcProvider(networkProviders.infuraGoerliURL);
    const [isLoading, setIsLoading] = useState(false);
    const [recoverySeed, setRecoverySeed] = useState<any[]>([
        { id: "0", value: "" },
        { id: "1", value: "" },
        { id: "2", value: "" },
        { id: "3", value: "" },
        { id: "4", value: "" },
        { id: "5", value: "" },
        { id: "6", value: "" },
        { id: "7", value: "" },
        { id: "8", value: "" },
        { id: "9", value: "" },
        { id: "10", value: "" },
        { id: "11", value: "" },
    ]);

    useEffect(() => {
        console.log(TAG, " == ", recoverySeed.length);
        const checkPK = async () => {
            let cipher = await AsyncStorage.getItem(encryptInfo.key);
            if (cipher != null && cipher != "" && cipher != undefined) {
                setIsLoading(true);
                let result = await Aes.decrypt(cipher, encryptInfo.key, encryptInfo.iv, "aes-128-cbc");
                let wallet = new ethers.Wallet(result, provider);
                let address = await wallet.getAddress();
                let balance = await wallet.getBalance();
                console.log(TAG, " ==== ", balance.toString(), " ", address);
                setIsLoading(false);
                Alert.alert("Success!", "Load Saved Wallet!", [
                    {
                        text: "OK", onPress: () => {
                            setTimeout(() => {
                                navigator.navigate(Constants.connectWallet, { address: address, balance: balance.toString() });
                            }, 0)
                        }
                    }
                ], { cancelable: false });
            }
        }
        checkPK()
            .catch((error: any) => {
                console.log(TAG, " useEffect error = : ", error);
            });
    }, [])

    const handleStart = async () => {
        setIsLoading(true);
        let isInputed = true;
        let seedStr = "";
        for (let i = 0; i < recoverySeed.length; i++) {
            if (recoverySeed[i].value == "") {
                isInputed = false;
                break;
            } else {
                seedStr = seedStr + " " + recoverySeed[i].value;
            }
        }
        if (isInputed) {
            console.log(TAG, " ==== ", seedStr.trim(), isLoading);
            try {
                const wallet = ethers.Wallet.fromMnemonic(seedStr.trim(), networkProviders.path).connect(provider);
                // const wallet = ethers.Wallet.fromMnemonic(mnemonic, networkProviders.path).connect(provider);
                let address = await wallet.getAddress();
                let balance = await wallet.getBalance();
                let privateKey = wallet.privateKey;
                let cipher = await Aes.encrypt(privateKey, encryptInfo.key, encryptInfo.iv, "aes-128-cbc");
                await AsyncStorage.setItem(encryptInfo.key, cipher);
                console.log(TAG, " ==== ", privateKey, " ", balance.toString(), " ", address);
                setIsLoading(false);
                Alert.alert("Success to Connect!", privateKey, [
                    {
                        text: "OK", onPress: () => {
                            navigator.navigate(Constants.connectWallet, { address: address, balance: balance.toString() });
                        }
                    }
                ], { cancelable: false });
            } catch (error) {
                console.log(TAG, " error ==== ", error);
                setIsLoading(false);
                Alert.alert(error.toString().replace(/<\/?[^>]+>/gi, '').replace(/\\n/g, '').replace(/\"/g, ""));
            }
        } else {
            setIsLoading(false);
            Alert.alert(Constants.warning, "Please fill every gaps!");
        }
    }

    const handleInputChange = (id: string, text: string) => {
        let inputStr = text.trim();
        let strList = inputStr.split(" ");
        if (strList.length == 12) {
            let newRecoverySeed = [];
            for (let i = 0; i < strList.length; i++) {
                newRecoverySeed.push({ "id": i.toString(), "value": strList[i] });
            }
            setRecoverySeed(newRecoverySeed);
        } else {
            const updatedInputs = recoverySeed.map((item: any) =>
                item.id === id ? { ...item, value: inputStr } : item
            );
            setRecoverySeed(updatedInputs);
        }
    };

    const renderItem = (item: any) => {
        let index = item.index;
        let word = item.item;
        // console.log(TAG, " ==== ", index, word);
        return (
            <View key={index} style={styles.input_view_container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        // placeholder={"seed"}
                        value={word.value}
                        onChangeText={(text) => handleInputChange(word.id, text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        // placeholder={"seed"}
                        value={recoverySeed[parseInt(word.id) + 6].value}
                        onChangeText={(text) => handleInputChange((parseInt(word.id) + 6).toString(), text)}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={globalStyle.container}>
            {
                isLoading && <ProgressIndicator />
            }
            {
                <View style={globalStyle.container}>
                    <View style={globalStyle.head_title_area}>
                        <Text style={globalStyle.head_title}>{Constants.startUpHead}</Text>
                    </View>
                    <KeyboardAwareScrollView contentContainerStyle={globalStyle.contentContainerStyle} extraScrollHeight={100} enableOnAndroid={true}>
                        <View style={styles.input_view_area}>
                            <ScrollView horizontal={true} style={{ width: "100%" }}>
                                <FlatList
                                    data={recoverySeed.slice(0, 6)}
                                    renderItem={(item: any) => renderItem(item)}
                                    keyExtractor={(item: any) => (item.id)}
                                />
                            </ScrollView>
                        </View>
                        <View style={styles.button_area}>
                            <TouchableOpacity style={globalStyle.text_button_bg} onPress={() => {
                                setIsLoading(true);
                                setTimeout(() => {
                                    handleStart();
                                }, 0);
                            }}>
                                <Text style={[globalStyle.text_button, globalStyle.font_bold]}>Connect</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    input_view_area: {
        marginTop: height * 0.05,
        marginHorizontal: "5%",
        height: height * 0.5,
        width: "90%"
    },
    input_view_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        height: 40,
        borderRadius: 20,
        marginHorizontal: width * 0.025,
        width: width * 0.4
    },
    input: {
        padding: 5,
        color: Colors.black,
        fontSize: 25,
        textAlign: "center",
        width: "100%",
    },
    button_area: {
        marginHorizontal: "15%",
        height: 50,
        borderRadius: 10,
        width: "70%",
    }
});
