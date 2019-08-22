import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { primaryColor, secondaryColor, currentTabColor, tabColor } from './utils/colorsAndMargins'
import SaveDeleteEvent from './components/SaveDeleteEvent'
import Start from './screens/Start'
import EventList from './screens/EventList'
import EventPage from './screens/EventPage'
import Transport from './screens/Transport'
import Accommodation from './screens/Accommodation'
import Costs from './screens/Costs'
import Notes from './screens/Notes'
import TransportDetails from './screens/TransportDetails'
import AccommodationDetails from './screens/AccommodationDetails'

const commonHeader = {
  headerStyle: {
    backgroundColor: secondaryColor
  },
  headerTintColor: primaryColor,
}
const getTabIcon = (route) => {
  const tabs = [
    {
      name: 'EventPage',
      icon: 'list'
    },
    {
      name: 'Transport',
      icon: 'flight'
    },
    {
      name: 'Accommodation',
      icon: 'hotel'
    },
    {
      name: 'Costs',
      icon: 'euro-symbol'
    },
    {
      name: 'Notes',
      icon: 'assignment'
    }
  ]
  const tab = tabs.filter(el => el.name === route)[0]
  return tab.icon
}
const EventStackNavigator = createStackNavigator(
  { EventPage },
  {
    initialRouteName: "EventPage",
    defaultNavigationOptions: {
      ...commonHeader,
      headerRight: (
        <SaveDeleteEvent />
      ) 
    }
  }
)
const TransportStackNavigator = createStackNavigator(
  {
    Transport,
    TransportDetails
  },
  {
    initialRouteName: "Transport",
    defaultNavigationOptions: {...commonHeader}
  }
)
TransportStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if (routeName === 'TransportDetails') {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}
const AccommodationStackNavigator = createStackNavigator(
  {
    Accommodation,
    AccommodationDetails
  },
  {
    initialRouteName: "Accommodation",
    defaultNavigationOptions: {...commonHeader}
  }
)
AccommodationStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  let routeName = navigation.state.routes[navigation.state.index].routeName
  if (routeName === 'AccommodationDetails') {
    tabBarVisible = false
  }
  return {
    tabBarVisible
  }
}
const CostsStackNavigator = createStackNavigator(
  { Costs },
  {
    initialRouteName: 'Costs',
    defaultNavigationOptions: {...commonHeader }
  }
)
const NotesStackNavigator = createStackNavigator(
  { Notes },
  {
    initialRouteName: 'Notes',
    defaultNavigationOptions: {...commonHeader }
  }
)
const TabNavigator = createBottomTabNavigator(
  { 
    EventPage: { screen: EventStackNavigator },
    Transport: { screen: TransportStackNavigator },
    Accommodation: { screen: AccommodationStackNavigator },
    Costs: { screen: CostsStackNavigator },
    Notes: { screen: NotesStackNavigator }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: tabColor
      },
      activeTintColor: currentTabColor,
      inactiveTintColor: primaryColor,
      showIcon: true,
      showLabel: false
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        const icon = getTabIcon(routeName)
        return <Icon name={icon} size={40} color={tintColor} />
      }
    }),
  }
)
export const AppNavigator = createStackNavigator(
   {
     Start,
     EventList,
     Event: { screen: TabNavigator }
   },
   {
     initialRouteName: "Start",
     defaultNavigationOptions: {
      header: null
   }
  }
)