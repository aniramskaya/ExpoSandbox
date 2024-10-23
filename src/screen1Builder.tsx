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
import { useEffect } from 'react';
import { urlCommand } from './Navigation/Command/DeepLinkCommandNavigation'
import { urlQuery } from './Navigation/Query/DeepLinkQueryNavigation';
import { addNavigateToUrlListener, passNavigationResult, ScreenResult, ScreenError } from '../modules/rnn_passback'

const Screen1Builder = (props: NavigationProps) => {
  const router: RootRouter = new RootRouterImpl()

  useEffect(() => {
    const navigationListener = addNavigateToUrlListener((payload) => {
      console.log("did receive navigate to url event with payload {payload}")
      if (payload.requestId == undefined) {
        urlCommand.execute(new URL(payload.url), payload.props);
      } else {
        urlQuery.load<any>(new URL(payload.url), payload.props)
        .then( (result) => {
          passNavigationResult(payload.requestId, JSON.stringify({data: result}))
        })
        .catch((error) => {
          passNavigationResult(payload.requestId, JSON.stringify({value: error}))
        })
      }
    });

    console.log("added subscription to NavigateToUrl event")

    return function cleanup() {
      navigationListener.remove(); 
      console.log("removed subscription to NavigateToUrl event")
    }
  }, [])

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
      onPushTextScreen: (componentId) => { urlCommand.execute(new URL('rnn:///text-screen/'), {componentId: componentId}) },
      onPushNativeTextScreen: (componentId) => { urlCommand.execute(new URL('rnn:///native-text-screen/'), {componentId: componentId}) }
    }
  )
}

export default Screen1Builder;
