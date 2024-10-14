import { SafeAreaView, View } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import Styles from "../styles/Styles";
import { useContext } from "react";

const selections = ['Kilometers', 'Miles']

export default function Settings() {

    const { workout, setWorkout, unit, setUnit } = useContext(WorkoutContext)

    const handleUnitChange = (value) => {
        setUnit(value)
    }


    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={Styles.header}>Settings</Text>
            <Text style={Styles.title}>Units</Text>
            <RadioButton.Group onValueChange={handleUnitChange} value={unit}>
                {selections.map(s => <RadioSelection key={s} text={s} value={s} />)}
            </RadioButton.Group>
        </SafeAreaView>
    )
}

// Komponentti radiobuttoneiden näyttämiseen
function RadioSelection({ value, text }) {
    return (
        <View style={Styles.radioButton}>
            <RadioButton
                value={value} />
            <Text>{text}</Text>
        </View>
    )
}