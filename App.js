import React from 'react'
import { createAppContainer } from 'react-navigation'
import { AppNavigator } from './src/routes'
import { Provider } from 'react-redux'
import store from './src/store/store'

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}