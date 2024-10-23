import UrlCommandNavigator from '../UrlCommandNavigator';
import { Navigation } from 'react-native-navigation';

const Colors = {
  buttonColor: '#14B746',
  titleColor: '#000000'
}

class NativeTextScreenNavigator implements UrlCommandNavigator {
    readonly componentName = 'NativeTextScreen'

    canNavigate(url: URL): boolean {
        return url.toString() == 'rnn:///native-text-screen/'
    }
    navigate(url: URL, props: any): void {
      if (!this.canNavigate(url)) { return }
      if (props.componentId == undefined) { return }
      Navigation.push( props.componentId, {
        externalComponent: {
          name: this.componentName,
          options: {
            topBar: {
                title: {
                  text: props.title
                }
            },
          },
          passProps: props.data
        }
      }).then((result: string) => {
            console.log("Push result:", result);
          }).catch((error) => {
            console.error("Error pushing:", error);
          })
    }
}

export default NativeTextScreenNavigator;