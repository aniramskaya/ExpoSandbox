import UrlNavigator from '../UrlNavigator';
import { Navigation } from 'react-native-navigation';

const Colors = {
  buttonColor: '#14B746',
  titleColor: '#000000'
}

class NativeScreen1Navigator implements UrlNavigator {
    readonly componentName = 'NativeScreen1'

    canNavigate(url: URL): boolean {
        return url.toString() == 'rnn:///native-screen-1/'
    }
    navigate(url: URL, props: any): void {
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
          })
    }
}

export default NativeScreen1Navigator;