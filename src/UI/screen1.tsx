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

const Screen1 = () => {
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
            <Text style={styles.sectionDescription}>React Screen</Text>
            <View style = {{margin: 40}}>
              <Button title='Push react screen' onPress={ () => { } } />
              <Button title='Modal react screen' onPress={ () => { } } />
              <Button title='Modal stack react screen' onPress={ () => { } } />
            </View>
            <View style = {{margin: 40}}>
              <Button title='Push native screen' onPress={ () => { } } />
              <Button title='Modal native screen' onPress={ () => { } } />
              <Button title='Modal stack native screen' onPress={ () => { } } />
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

export default Screen1;
