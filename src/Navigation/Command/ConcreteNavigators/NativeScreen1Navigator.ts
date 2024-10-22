import UrlCommandNavigator from '../UrlCommandNavigator';
import { Navigation } from 'react-native-navigation';

const Colors = {
  buttonColor: '#14B746',
  titleColor: '#000000'
}

class NativeScreen1Navigator implements UrlCommandNavigator {
    readonly componentName = 'NativeScreen1'

    canNavigate(url: URL): boolean {
        return url.toString() == 'rnn:///native-screen-1/'
    }
    navigate(url: URL, props: any): void {
      if (!this.canNavigate(url)) { return }
        Navigation.showModal( {
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
          console.log("Modal result:", result);
        }).catch((error) => {
          console.error("Error showing modal:", error);
        });
    }
}

export default NativeScreen1Navigator;