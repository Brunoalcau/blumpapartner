import React from 'react';
import { connect } from 'react-redux';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';

import {
  Login,
  Services,
  Home,
  Schedule,
  Menu,
  Payment,
  Profile,
  Preview,
  ForgetPassword,
  ResetPassword,
  ServiceDetail,
  ResetPasswordSuccess,
  Chat,
  GoodHabits,
  GoodHabitsDetails,
  Post,
  Auth,
  Filter,
  FilterPayment
} from './screens';

import { TabBarIcon } from '~/commons';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import { theme } from '~/config';

const AppNavigator = createBottomTabNavigator(
  {
    Home: { screen: Home, navigationOptions: { title: 'Início' } },
    Services: {
      screen: Services,
      navigationOptions: { title: 'Pegar Serviços' }
    },
    Schedule: { screen: Schedule, navigationOptions: { title: 'Agenda' } },
    Menu: { screen: Menu, navigationOptions: { title: 'Preferências' } }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <TabBarIcon icon={navigation.state.routeName} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: theme.tertiary,
      inactiveTintColor: theme.icon
    }
  }
);
const AuthStack = createStackNavigator({
  Preview: { screen: Preview },
  ForgetPassword: { screen: ForgetPassword },
  Login: { screen: Login },
  ResetPassword: { screen: ResetPassword },
  ResetPasswordSuccess: { screen: ResetPasswordSuccess }
});
const AuthLoading = createStackNavigator({
  AuthLoading: { screen: Auth }
});

const App = createStackNavigator({
  Tab: { screen: AppNavigator, navigationOptions: { header: null } },
  Payment: { screen: Payment, navigationOptions: { header: null } },
  Profile: { screen: Profile, navigationOptions: { header: null } },
  ServiceDetail: { screen: ServiceDetail, navigationOptions: { header: null } },
  Filter: { screen: Filter, navigationOptions: { header: null } },
  Chat: { screen: Chat, navigationOptions: { header: null } },
  GoodHabits: { screen: GoodHabits, navigationOptions: { header: null } },
  GoodHabitsDetails: {
    screen: GoodHabitsDetails,
    navigationOptions: { header: null }
  },
  Post: { screen: Post, navigationOptions: { header: null } },
  FilterPayment: { screen: FilterPayment, navigationOptions: { header: null } }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      Auth: AuthStack,
      App: App
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
