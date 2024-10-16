import Screen1 from './src/UI/screen1'
import EmptyView from './src/UI/emptyView'
import {AppRegistry} from 'react-native';
import {
  View,
} from 'react-native';

AppRegistry.registerComponent('main', () => EmptyView);

import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('Screen1', () => Screen1);

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'Screen1'
              }
            }
          ]
        }
      }
    });
  });