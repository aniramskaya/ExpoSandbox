package com.cdek.expoSandbox;

import android.annotation.TargetApi;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.reactnativenavigation.NavigationActivity;
import com.reactnativenavigation.react.CommandListenerAdapter;
import com.reactnativenavigation.react.NavigationModule;
import com.reactnativenavigation.react.events.EventEmitter;
import com.reactnativenavigation.viewcontrollers.child.ChildControllersRegistry;
import com.reactnativenavigation.viewcontrollers.modal.ModalStack;
import com.reactnativenavigation.viewcontrollers.navigator.Navigator;
import com.reactnativenavigation.viewcontrollers.overlay.OverlayManager;
import com.reactnativenavigation.viewcontrollers.viewcontroller.RootPresenter;

public class CDEKReactActivity extends ReactActivity  implements DefaultHardwareBackBtnHandler, PermissionAwareActivity, NavigationModule.NavigatorProvider, ReactInstanceManager.ReactInstanceEventListener {
    protected Navigator navigator;

    public Navigator getNavigator() {
        return navigator;
    }
    protected CDEKReactActivity() {
        super();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getReactNativeHost().getReactInstanceManager().addReactInstanceEventListener(this);
        if (isFinishing()) {
            return;
        }
        //addDefaultSplashLayout();
        navigator = new Navigator(this,
                new ChildControllersRegistry(),
                new ModalStack(this),
                new OverlayManager(),
                new RootPresenter()
        );
        navigator.bindViews();
    }

    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        navigator.onConfigurationChanged(newConfig);
    }

    @Override
    public void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        navigator.setContentLayout(findViewById(android.R.id.content));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (navigator != null) {
            navigator.destroy();
        }
        getReactNativeHost().getReactInstanceManager().removeReactInstanceEventListener(this);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        if (!navigator.handleBack(new CommandListenerAdapter())) {
            CDEKReactActivity.super.onBackPressed();
        }
    }

//    protected void addDefaultSplashLayout() {
//        View view = new View(this);
//        setContentView(view);
//    }

    private void emitAppLaunched(@NonNull ReactContext context) {
        new EventEmitter(context).appLaunched();
    }

    @Override
    public void onReactContextInitialized(final ReactContext context) {
        emitAppLaunched(context);
    }

}
