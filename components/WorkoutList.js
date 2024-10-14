import { FlatList, SafeAreaView, View } from "react-native";
import { Avatar, Card, Chip, Text } from "react-native-paper";
import Styles from "../styles/Styles";
import WorkoutContext from "./WorkoutContext";
import { useContext } from "react";
import { sports } from './Constants'

export default function WorkoutList() {

    // Haetaan harjoitukset ja yksikkö WorkoutContextista
    const { workout, setWorkout, unit } = useContext(WorkoutContext)

    // Funktio laskee yhteen eri urheilulajien matkat
    const calculateTotalDistances = () => {
        const totalDistances = {}

        workout.forEach(item => {
            const distance = Number(item.distance)
            if (!isNaN(distance)) {
                totalDistances[item.sport] = (totalDistances[item.sport] || 0) + distance
            }
        })

        return totalDistances
    }

    const totalDistances = calculateTotalDistances()

    return (
        <SafeAreaView style={Styles.container}>
            <Text variant="headlineLarge" style={Styles.header}>Workouts</Text>
            <SportsSummary totalDistances={totalDistances} unit={unit}/>
            <FlatList
                data={workout}
                renderItem={({ item }) => <Item item={item} unit={unit} />}
                keyExtractor={item => item.day + item.timestamp + item.distance}
            />
        </SafeAreaView>
    )
}

function Item({ item, unit }) {
    const distanceInKm = Number(item.distance)
    const displayedDistance = unit === 'Miles'
     ? (distanceInKm * 0.621371).toFixed(2) 
     : distanceInKm.toFixed(2)

    return (
        <Card style={Styles.card}>
            <Card.Title titleVariant='titleMedium' title={item.day}
                left={props => <Avatar.Icon icon={item.sport} size={40}/>}
            />
            <Card.Content>
                <Text style={Styles.cardText}>Distance: {displayedDistance} {unit === 'Miles' ? 'mi' : 'km'}</Text>
                <Text style={Styles.cardText}>Duration: {item.duration} min</Text>
            </Card.Content>
        </Card>
    )
}

function SportsSummary({ totalDistances, unit }) {
    return (
        <View style={Styles.sportsSummary}>
            {sports.map(sport => {
                const distance = totalDistances[sport.value] || 0
                const displayedDistance = unit === 'Miles' 
                    ? (distance * 0.621371).toFixed(2)
                    : distance.toFixed(2)
                
                return (
                    <Chip
                        key={sport.value}
                        icon={sport.icon}
                        mode='outlined'
                        style={Styles.chip}
                    >
                        {displayedDistance} {unit === 'Miles' ? 'mi' : 'km'}
                    </Chip>
                )
            })}
        </View>
    )
}