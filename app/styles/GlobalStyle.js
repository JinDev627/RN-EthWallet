import { StyleSheet, Platform, Dimensions } from "react-native";
import { Colors } from "./Colors.js";
const { width, height } = Dimensions.get("window");
export const globalStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: Colors.black,
        height: "100%",
        zIndex: 9
    },
    container_page: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    contentContainerStyle: {
        width: '100%',
        flexDirection: "column",
        alignItems: 'center',
    },
    head_title_area: {
        marginTop: height * 0.15,
        marginLeft: width * 0.05,
        marginRight: width * 0.05
    },
    head_title: {
        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold",
        color: Colors.gold
    },
    text_button_size: {
        width: '100%',
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 50,
    },
    text_button_bg: {
        backgroundColor: Colors.gold,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    text_button_row: {
        borderBottomColor: Colors.white,
        borderBottomWidth: 1
    },
    text_button: {
        fontSize: 22,
        fontWeight: null,
        color: Colors.black,
    },
    font_bold: {
        fontWeight: "bold"
    },
});