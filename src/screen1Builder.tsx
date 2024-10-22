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
      onModalNativeScreen: () => { urlCommand.execute(new URL('rnn:///native-screen-1'), {title: "Native screen 1", data: {text: "This text is passed from React Native part"}}) },
      onModalInStackNativeScreen: () => { router.modalInStackNativeScreen('NativeScreen1') },
      onPushTextScreen: (componentId) => { urlCommand.execute(new URL('rnn:///text-screen/'), {componentId: componentId}) }
    }
  )
}

export default Screen1Builder;
