import EmptyView from './src/UI/emptyView'
import {AppRegistry} from 'react-native';
import { Navigation } from 'react-native-navigation';
import Screen1Builder from './src/screen1Builder'
import Screen2Builder from './src/screen2Builder'
import Screen3Builder from './src/screen3Builder'
import TextScreen from './src/UI/textScreen'

AppRegistry.registerComponent('main', () => EmptyView);

Navigation.registerComponent('Screen1', () => Screen1Builder);
Navigation.registerComponent('Screen2', () => Screen2Builder);
Navigation.registerComponent('Screen3', () => Screen3Builder);
Navigation.registerComponent('TextScreen', () => TextScreen)

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