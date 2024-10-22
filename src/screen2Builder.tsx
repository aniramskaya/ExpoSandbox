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
import { urlCommand } from './Navigation/Command/DeepLinkCommandNavigation'

const Screen2Builder = (props: NavigationProps) => {
  const router: RootRouter = new RootRouterImpl()

  useNavigationButtonPress((e) => {
    if (e.buttonId == CommonButtonIds.closeButton) {
      Navigation.dismissModal(e.componentId)
    }
  }, props.componentId)
  
  return navigationTestView(
    {
      props: props, 
      name: 'Screen2',
      onPushReactScreen: (componentId) => { router.pushScreen('Screen3', componentId)},
      onModalReactScreen: () => { router.modalScreen('Screen3') },
      onModalInStackReactScreen: () => { router.modalInStackScreen('Screen3') },
      onPushNativeScreen: (componentId) => { router.pushNativeScreen('NativeScreen1', componentId) },
      onModalNativeScreen: () => { router.modalNativeScreen('NativeScreen1') },
      onModalInStackNativeScreen: () => { router.modalInStackNativeScreen('NativeScreen1') },
      onPushTextScreen: (componentId) => { urlCommand.execute(new URL('rnn:///text-screen/'), {componentId: componentId}) }
    }
  )
}

export default Screen2Builder;
