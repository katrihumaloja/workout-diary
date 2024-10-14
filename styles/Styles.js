import { StyleSheet } from "react-native";
import Constants from "expo-constants"

export default Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        padding: 10,
        marginTop: Constants.statusBarHeight + 10,
        margin: 10
    },
    header: {
        margin: 10,
        fontFamily: 'HeaderFont',
        fontSize: 40
    },
    textInput: {
        marginTop: 10
    },
    button: {
        margin: 10,
        backgroundColor: '#2F7B9B'
    },
    card: {
        margin: 10,
        backgroundColor: '#d4f1f4'
    },
    cardText: {
        fontSize: 16,
        padding: 2
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontSize: 20,
        margin: 5,
        marginTop: 20
    },
    modal: {
        justifyContent: 'stretch',
        alignItems: 'stretch',
        margin: 10
    },
    calendar: {
        backgroundColor: '#d4f1f4',
        marginTop: 10,
        borderRadius: 5
    },
    segmentedButtons: {
        marginTop: 20,
        marginBottom: 10
    },
    chip: {
        marginBottom: 10,
        backgroundColor: '#d4f1f4',
        borderWidth: 0,
        height: 60,
        justifyContent: 'center'
    },
    sportsSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
        marginTop: 20
    },
    snackbar: {
        backgroundColor: '#2F7B9B',
        borderRadius: 5
    },
    helperText: {
        fontSize: 15
    }
});