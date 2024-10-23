/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { ComponentId, NavigationProps } from '../navigationProps';

const navigationTestView = ( 
    {
      props, 
      name,
      onPushReactScreen, onModalReactScreen, onModalInStackReactScreen, 
      onPushNativeScreen, onModalNativeScreen, onModalInStackNativeScreen,
      onPushTextScreen, onPushNativeTextScreen
    }:
    {
        props: NavigationProps, 
        name: string,
        onPushReactScreen: (_: ComponentId) => void,
        onModalReactScreen: () => void,
        onModalInStackReactScreen: () => void,
        onPushNativeScreen: (_: ComponentId) => void,
        onModalNativeScreen: () => void,
        onModalInStackNativeScreen: () => void,
        onPushTextScreen: (_: ComponentId) => void,
        onPushNativeTextScreen: (_: ComponentId) => void
    }
) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <View style={backgroundStyle}>
        <View
          style={{
            backgroundColor: backgroundStyle.backgroundColor,
            margin: 44
          }}>
            <Text style={styles.sectionTitle}>MainApp</Text>
            <Text style={styles.sectionDescription}>React { name }</Text>
            <Text style={styles.sectionDescription}>Expo updates Android test</Text>
            <View style = {{margin: 40}}>
              <Button title='Push react screen' onPress={ () => { onPushReactScreen(props.componentId)} } />
              <Button title='Modal react screen' onPress={ onModalReactScreen } />
              <Button title='Modal stack react screen' onPress={ onModalInStackReactScreen } />
            </View>
            <View style = {{margin: 40}}>
              <Button title='Push native screen' onPress={ () => { onPushNativeScreen(props.componentId)} } />
              <Button title='Modal native screen' onPress={ onModalNativeScreen } />
              <Button title='Modal stack native screen' onPress={ onModalInStackNativeScreen } />
            </View>
            <View style = {{margin: 40}}>
              <Button title='Open RN text screen' onPress={ () => { onPushTextScreen(props.componentId)} } />
              <Button title='Open Native text screen' onPress={ () => { onPushNativeTextScreen(props.componentId)} } />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },
});

export default navigationTestView;
