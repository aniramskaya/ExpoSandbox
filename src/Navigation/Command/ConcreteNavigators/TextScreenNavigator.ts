import UrlCommandNavigator from '../UrlCommandNavigator';
import { Navigation } from 'react-native-navigation';

const Colors = {
  buttonColor: '#14B746',
  titleColor: '#000000'
}

class TextScreenNavigator implements UrlCommandNavigator {
    readonly componentName = 'TextScreen'

    canNavigate(url: URL): boolean {
        return url.toString() == 'rnn:///text-screen/'
    }
    navigate(url: URL, props: any): void {
      if (!this.canNavigate(url)) { return }
      if (props.componentId == undefined) { return }
      Navigation.push(props.componentId, {
        component: {
            name: "TextScreen",
            options: {
              topBar: {
                  title: {
                    text: "Text screen",
                    color: Colors.titleColor
                  },
                  backButton: {
                    color: Colors.buttonColor
                  }
              }
            }
          }
        }).then((result: string) => {
            console.log("Push result:", result);
          }).catch((error) => {
            console.error("Error pushing:", error);
          })
    }
}

export default TextScreenNavigator;