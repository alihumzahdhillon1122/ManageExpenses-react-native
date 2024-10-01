import { StatusBar } from 'expo-status-bar';
// Navigation 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
//colors
import { GlobalStyles } from './constants/styles';
//Icons
import { Ionicons } from '@expo/vector-icons'
import IconButton from './components/ExpensesOutput/UI/IconButton';
// context Provider 
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverView() {
  return (
    <BottomTab.Navigator screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onWhenPress={() => { navigation.navigate('MangeExpenses') }} />

    })}>
      <BottomTab.Screen name='RecentExpenses' component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' color={color} size={size} />
      }} />
      <BottomTab.Screen name='AllExpenses' component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => <Ionicons name='calendar' color={color} size={size} />

      }} />
    </BottomTab.Navigator>
  )
}


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white'

          }}>
            <Stack.Screen name='ExpensesOverView' component={ExpensesOverView} options={{
              headerShown: false
            }} />
            <Stack.Screen name='MangeExpenses' component={ManageExpenses} options={{
              // title: 'Manage Expense',
              presentation: 'modal',
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider >

    </>

  );
}


