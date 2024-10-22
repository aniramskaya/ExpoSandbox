
import React, { useState } from 'react';
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
import { NavigationProps } from '../navigationProps';
import { urlQuery } from '../Navigation/Query/DeepLinkQueryNavigation';
import { TextEditScreenData } from '../Navigation/Query/ConcreteNavigators/TextEditScreenNavigator';

const TextScreen = (props: NavigationProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const [text, setText] = useState("Hello, world!");

  const onButtonPress = () =>   {
    urlQuery.load<TextEditScreenData>(new URL('rnn:///native-text-edit-screen'), {data: text})
    .then( (data) => {
        setText(data.text)
    })
    .catch((error) => {
        console.error("Error opening edit screen:", error);
    })
  }

  return (
    <View style={backgroundStyle}>
        <View
          style={{
            backgroundColor: backgroundStyle.backgroundColor,
            margin: 44
          }}>
            <Text style={styles.sectionTitle}>You can edit this text on the next screen</Text>
            <Text style={styles.sectionDescription}>{text}</Text>
            <Button title = "Edit" onPress={ onButtonPress } />
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

export default TextScreen;
