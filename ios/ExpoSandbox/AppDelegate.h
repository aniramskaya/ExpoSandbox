#import <RCTAppDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>

@interface AppDelegate : EXAppDelegateWrapper

@end

NS_ASSUME_NONNULL_BEGIN

@interface CDEKRootViewFactory: EXReactRootViewFactory
- (instancetype)initWithReactDelegate:(nullable EXReactDelegateWrapper *)reactDelegate
                        configuration:(RCTRootViewFactoryConfiguration *)configuration
           turboModuleManagerDelegate:(id<RCTTurboModuleManagerDelegate>)turboModuleManagerDelegate
                extraModulesForBridge:(NSArray<id<RCTBridgeModule>> * (^)(RCTBridge *))extraModulesForBridge;

@end

NS_ASSUME_NONNULL_END
