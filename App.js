import { BottomNavigation, MD2LightTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import WorkoutContext from './components/WorkoutContext';
import AddWorkout from './components/AddWorkout';
import WorkoutList from './components/WorkoutList';
import Settings from './components/Settings';
import { workouts } from './components/Constants';
import { useFonts } from 'expo-font';

const routes = [
  { key: 'addworkout', title: 'Add workout', focusedIcon: 'plus' },
  { key: 'workoutlist', title: 'Workouts', focusedIcon: 'chart-line' },
  { key: 'settings', title: 'Settings', focusedIcon: 'cog' }
]

export default function App() {

  const [workout, setWorkout] = useState(workouts)
  const [index, setIndex] = useState(0)
  const [unit, setUnit] = useState('Kilometers')

  const renderScene = BottomNavigation.SceneMap({
    addworkout: AddWorkout,
    workoutlist: WorkoutList,
    settings: Settings
  })

  const [loaded] = useFonts({
    HeaderFont: require('./assets/fonts/BebasNeue-Regular.ttf')
  })

  if (!loaded) {
    return null
  }

  return (
    <PaperProvider theme={MD3LightTheme}>
      <WorkoutContext.Provider value={{ workout, setWorkout, unit, setUnit }}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          barStyle={{ backgroundColor: '#d4f1f4' }}
        />
      </WorkoutContext.Provider>
    </PaperProvider>
  );
}
