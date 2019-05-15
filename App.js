import React from 'react';
import { Root } from 'native-base';
import moment from 'moment';
import OneSignal from 'react-native-onesignal';
import Permissions from 'react-native-permissions';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import 'moment/src/locale/pt';
import { InteractionManager } from 'react-native';
// Locals
import { setTopLevelNavigator, configurationGeoLocation } from '~/helpers';

import { OffineNOtive } from './src/commons';
import Provider from './src/Provider';
import Routes from './src/Routes';
import { registerInterceptors, addOneSignalEvents } from '~/config';
import store from './src/store';
import {
  handleLocationUpdate,
  BACKGROUND_LOCATION_UPDATES_TASK,
  backgroundconfigure,
  backgroundconfigureEvents
} from '~/helpers';

// BackgroundTask.define(() => {
//   console.log('Hello from a background task');
//   BackgroundTask.finish();
// });

export default class App extends React.Component {
  constructor() {
    super();
    registerInterceptors();
    moment.locale('pt');
  }
  async componentDidMount() {
    try {
      configurationGeoLocation(store);
      backgroundconfigure();
      backgroundconfigureEvents(store);
    } catch (e) {
      console.log(e);
    }

    // await Permissions.askAsync(Permissions.LOCATION);
    // addOneSignalEvents(store);
  }
  render() {
    return (
      <Provider store={store}>
        <Root>
          <Routes
            ref={navigator => {
              setTopLevelNavigator(navigator);
            }}
          />
        </Root>
      </Provider>
    );
  }
}

// // const init = async () => {
// //   TaskManager.defineTask(
// //     BACKGROUND_LOCATION_UPDATES_TASK,
// //     handleLocationUpdate
// //   );
// // };

// // init();

/**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
// import { Root } from 'native-base';

// // Locals
// import Provider from './src/Provider';
// import store from './src/store';
// import Routes from './src/Routes';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu'
// });

// type Props = {};
// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <Routes />
//       </Provider>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// });
