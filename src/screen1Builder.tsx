/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationProps } from './navigationProps';
import { CommonButtonIds, RootRouter, RootRouterImpl } from './rootRouter';
import navigationTestView from './UI/navigationTestView'
import { useNavigationButtonPress } from 'react-native-navigation-hooks'
import { Navigation } from 'react-native-navigation';

const Screen1Builder = (props: NavigationProps) => {
  const router: RootRouter = new RootRouterImpl()

  useNavigationButtonPress((e) => {
    if (e.buttonId == CommonButtonIds.closeButton) {
      Navigation.dismissModal(e.componentId)
    }
  }, props.componentId)

  return navigationTestView(
    {
      props: props, 
      name: 'Screen1',
      onPushReactScreen: (componentId) => { router.pushScreen('Screen2', componentId)},
      onModalReactScreen: () => { router.modalScreen('Screen2') },
      onModalInStackReactScreen: () => { router.modalInStackScreen('Screen2') },
      onPushNativeScreen: (componentId) => { router.pushNativeScreen('NativeScreen1', componentId) },
      onModalNativeScreen: () => { router.modalNativeScreen('NativeScreen1') },
      onModalInStackNativeScreen: () => { router.modalInStackNativeScreen('NativeScreen1') }
    }
  )
}

export default Screen1Builder;
