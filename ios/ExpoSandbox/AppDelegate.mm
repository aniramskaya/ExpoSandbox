#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import <ReactCommon/RCTTurboModuleManager.h>
#import <Foundation/Foundation.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <ExpoModulesCore-Swift.h>
#import "ExpoSandbox-Swift.h"

// --- BEGIN RNN HELPER ---
NS_ASSUME_NONNULL_BEGIN
@interface CDEKRootViewFactory: EXReactRootViewFactory
- (instancetype)initWithReactDelegate:(nullable EXReactDelegateWrapper *)reactDelegate
                        configuration:(RCTRootViewFactoryConfiguration *)configuration
           turboModuleManagerDelegate:(id<RCTTurboModuleManagerDelegate>)turboModuleManagerDelegate
                extraModulesForBridge:(NSArray<id<RCTBridgeModule>> * (^)(RCTBridge *))extraModulesForBridge;

@end
NS_ASSUME_NONNULL_END

@interface EXAppDelegateWrapper () <RCTTurboModuleManagerDelegate>
@end

// --- END RNN HELPER ---


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"main";

  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onJSBundleLoaded:) name:RCTJavaScriptDidLoadNotification object:nil];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (void)onJSBundleLoaded:(NSNotification*)notification {
  [ReactNativeNavigation registerExternalComponent:@"NativeScreen1" callback:^UIViewController *(NSDictionary *props, RCTBridge *bridge) {
    return [Screen1ViewController loadFromNib];
  }];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Linking API
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [super application:application openURL:url options:options] || [RCTLinkingManager application:application openURL:url options:options];
}

// Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  BOOL result = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  return [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  return [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  return [super application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

// --- BEGIN RNN HELPER ---
- (UIWindow*)getWindow {
  return [super window];
}

- (void)setWindow:(UIWindow *)window {
  if ([super window] == nil) {
    [super setWindow:window];
  }
}

- (RCTRootViewFactory *)createRCTRootViewFactory
{
  __weak __typeof(self) weakSelf = self;
  RCTBundleURLBlock bundleUrlBlock = ^{
    RCTAppDelegate *strongSelf = weakSelf;
    return strongSelf.bundleURL;
  };

  RCTRootViewFactoryConfiguration *configuration =
      [[RCTRootViewFactoryConfiguration alloc] initWithBundleURLBlock:bundleUrlBlock
                                                       newArchEnabled:self.fabricEnabled
                                                   turboModuleEnabled:self.turboModuleEnabled
                                                    bridgelessEnabled:self.bridgelessEnabled];

  configuration.createRootViewWithBridge = ^UIView *(RCTBridge *bridge, NSString *moduleName, NSDictionary *initProps)
  {
    return [weakSelf createRootViewWithBridge:bridge moduleName:moduleName initProps:initProps];
  };

  configuration.createBridgeWithDelegate = ^RCTBridge *(id<RCTBridgeDelegate> delegate, NSDictionary *launchOptions)
  {
    return [weakSelf createBridgeWithDelegate:delegate launchOptions:launchOptions];
  };

  // TODO(kudo,20240706): Remove respondsToSelector and set the property directly when we upgrade to react-native 0.75
  if ([configuration respondsToSelector:@selector(setCustomizeRootView:)]) {
    [configuration setCustomizeRootView:^(UIView *_Nonnull rootView) {
      [weakSelf customizeRootView:(RCTRootView *)rootView];
    }];
  }

  return [[CDEKRootViewFactory alloc] initWithReactDelegate:self.reactDelegate
                                              configuration:configuration 
                                 turboModuleManagerDelegate:self
                                      extraModulesForBridge:^NSArray<id<RCTBridgeModule>> * (RCTBridge* bridge) {
        return [ReactNativeNavigation extraModulesForBridge:bridge];
      }
  ];
}
@end

@implementation CDEKRootViewFactory {
  NSArray<id<RCTBridgeModule>> * (^_extraModulesForBridgeBlock)(RCTBridge*);
}

- (instancetype)initWithReactDelegate:(EXReactDelegateWrapper *)reactDelegate 
                        configuration:(RCTRootViewFactoryConfiguration *)configuration
           turboModuleManagerDelegate:(id<RCTTurboModuleManagerDelegate>)turboModuleManagerDelegate
                extraModulesForBridge:(NSArray<id<RCTBridgeModule>> * _Nonnull (^)(RCTBridge * _Nonnull))extraModulesForBridge {
  if (self = [super initWithReactDelegate:reactDelegate 
                            configuration:configuration
               turboModuleManagerDelegate:turboModuleManagerDelegate]) {
    _extraModulesForBridgeBlock = extraModulesForBridge;
  }
  return self;
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge*)bridge {
  NSLog(@"extraModulesForBridge called");
  return _extraModulesForBridgeBlock(bridge);
}
// --- END RNN HELPER ---

@end
