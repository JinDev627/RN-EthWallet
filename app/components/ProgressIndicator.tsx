import { FC, Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from "react-native";
import { Colors } from '../styles/Colors';

export default class ProgressIndicator extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Image style={{ width: 100, height: 100 }} resizeMode={'contain'} source={require("../assets/images/loader.gif")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backgroundColor: Colors.white,
        opacity: 0.9
    },
    activityIndicator: {
        width: 50,
        height: 50,
    },
});
