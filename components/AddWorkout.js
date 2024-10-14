import { useContext, useState } from "react";
import { Keyboard, SafeAreaView, StatusBar, TouchableWithoutFeedback, View } from "react-native";
import { Button, Text, TextInput, SegmentedButtons, Portal, Modal, Snackbar, HelperText } from "react-native-paper";
import Styles from "../styles/Styles";
import WorkoutContext from "./WorkoutContext";
import { Calendar } from "react-native-calendars";
import { sports } from './Constants'

export default function AddWorkout() {

    const [sport, setSport] = useState(sports[0].value)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')
    const [day, setDay] = useState('Select date')
    const [show, setShow] = useState(false)
    const [visible, setVisible] = useState(false)
    const [distanceError, setDistanceError] = useState('')
    const [durationError, setDurationError] = useState('')
    const [dateError, setDateError] = useState('')
    const { workout, setWorkout, unit, setUnit } = useContext(WorkoutContext)

    function addWorkouts() {

        // Korvaa pilkut pisteillä
        const distanceValue = Number(distance.replace(',', '.'))
        const durationValue = Number(duration.replace(',', '.'))

        setDistanceError('')
        setDurationError('')
        setDateError('')

        // Tarkistaa virheet
        let hasError = false

        if (!distance) {
            setDistanceError('Distance is required.')
            hasError = true
        } else if (distanceValue < 0) {
            setDistanceError('Distance must be a positive number.')
            hasError = true
        }

        if (!duration) {
            setDurationError('Duration is required.')
            hasError = true;
        } else if (durationValue < 0) {
            setDurationError('Duration must be a positive number.')
            hasError = true
        }

        if (day === 'Select date') {
            setDateError('Please select a date.')
            hasError = true
        }

        // Jos on virheitä, lopeta funktio tähän
        if (hasError) return

        // Muunna etäisyys mailista kilometreiksi, jos yksikkö on mailit
        const finalDistance = unit === 'Miles' ? distanceValue * 1.60934 : distanceValue

        // Lisää uusi harjoitus
        const modified = [...workout, { sport, distance: finalDistance, duration: durationValue, day, unit }]
        setWorkout(modified)
        setVisible(true)

        // Tyhjennä kentät
        setDistance('')
        setDuration('')
        setDay('Select date')
        Keyboard.dismiss() // Sulkee näppäimistön
    }

    // Funktio Snackbarin piilottamiselle
    const onDismissSnackbar = () => setVisible(false)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={Styles.container}>
                <Text variant="headlineLarge" style={Styles.header}>Add workout</Text>
                <SelectSport
                    value={sport}
                    setValue={setSport}
                    values={sports} />
                <TextInput
                    style={Styles.textInput}
                    label={`Distance (${unit === 'Kilometers' ? 'km' : 'mi'})`}
                    mode='outlined'
                    value={distance}
                    onChangeText={setDistance}
                    keyboardType="numeric"
                    onSubmitEditing={Keyboard.dismiss} />
                <ErrorText errorMessage={distanceError} />
                <TextInput
                    style={Styles.textInput}
                    label={'Duration (min)'}
                    mode='outlined'
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="numeric"
                    onSubmitEditing={Keyboard.dismiss} />
                <ErrorText errorMessage={durationError} />
                <CalendarModal
                    show={show}
                    setShow={setShow}
                    setDay={setDay} />
                <Button
                    icon='calendar'
                    style={Styles.calendar}
                    onPress={() => setShow(true)}>{day}
                </Button>
                <ErrorText errorMessage={dateError} />
                <Button
                    style={Styles.button}
                    mode='contained'
                    onPress={addWorkouts}>
                    Add workout
                </Button>
                <Snackbar
                    style={Styles.snackbar}
                    visible={visible}
                    onDismiss={onDismissSnackbar}
                    duration={3000}
                    action={{
                        label: 'OK',
                        onPress: onDismissSnackbar
                    }}>
                    Workout added successfully!
                </Snackbar>
                <StatusBar />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

// Komponentti urheilulajin valintaan
function SelectSport({ value, setValue, values }) {

    // Muodostetaan nappiryhmä lajeista
    const buttons = values.map((v) => ({
        value: v.value,
        label: v.label,
        icon: v.icon
    }))

    return (
        <View>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={buttons}
                style={Styles.segmentedButtons}
                theme={{
                    colors: {
                        secondaryContainer: '#d4f1f4',
                    }
                }}
            />
        </View>
    )
}

// Kalenterikomponentti, joka avautuu Modalina
function CalendarModal({ show, setShow, setDay }) {

    // Funktio palauttaa päivämäärän muodossa DD.MM.YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()
        return day + '.' + month + '.' + year
    }

    return (
        <Portal>
            <Modal contentContainerStyle={Styles.modal}
                visible={show}
                onDismiss={() => setShow(false)} >
                <Calendar
                    onDayPress={day => {
                        setShow(false)
                        const formattedDate = formatDate(day.dateString)
                        setDay(formattedDate)
                    }}
                />
            </Modal>
        </Portal>
    )
}

// Komponentti virhetekstin näyttämiselle
function ErrorText({ errorMessage }) {
    return !!errorMessage ? (
        <HelperText
            type="error"
            visible={true}
            style={Styles.helperText}>
            {errorMessage}
        </HelperText>
    ) : null
}