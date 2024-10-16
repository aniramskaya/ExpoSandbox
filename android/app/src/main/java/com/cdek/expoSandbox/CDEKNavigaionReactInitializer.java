package com.cdek.expoSandbox;

import android.app.Activity;

import androidx.annotation.NonNull;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.reactnativenavigation.react.DevPermissionRequest;
import com.reactnativenavigation.react.events.EventEmitter;

public class CDEKNavigaionReactInitializer implements ReactInstanceManager.ReactInstanceEventListener {

    private final ReactInstanceManager reactInstanceManager;
    private final DevPermissionRequest devPermissionRequest;
    private boolean waitingForAppLaunchEvent = true;
    private boolean isActivityReadyForUi = false;

    CDEKNavigaionReactInitializer(ReactInstanceManager reactInstanceManager, boolean isDebug) {
        this.reactInstanceManager = reactInstanceManager;
        this.devPermissionRequest = new DevPermissionRequest(isDebug);
    }

    void onActivityCreated() {
        reactInstanceManager.addReactInstanceEventListener(this);
        waitingForAppLaunchEvent = true;
    }

    <T extends Activity & DefaultHardwareBackBtnHandler> void onActivityResume(T activity) {
        if (devPermissionRequest.shouldAskPermission(activity)) {
            devPermissionRequest.askPermission(activity);
        } else {
            reactInstanceManager.onHostResume(activity, activity);
            isActivityReadyForUi = true;
            prepareReactApp();
        }
    }

    void onActivityPaused(Activity activity) {
        isActivityReadyForUi = false;
        if (reactInstanceManager.hasStartedCreatingInitialContext()) {
            reactInstanceManager.onHostPause(activity);
        }
    }

    void onActivityDestroyed(Activity activity) {
        reactInstanceManager.removeReactInstanceEventListener(this);
        if (reactInstanceManager.hasStartedCreatingInitialContext()) {
            reactInstanceManager.onHostDestroy(activity);
        }
    }

    private void prepareReactApp() {
        if (shouldCreateContext()) {
            reactInstanceManager.createReactContextInBackground();
        } else if (waitingForAppLaunchEvent) {
            if (reactInstanceManager.getCurrentReactContext() != null) {
                emitAppLaunched(reactInstanceManager.getCurrentReactContext());
            }
        }
    }

    private void emitAppLaunched(@NonNull ReactContext context) {
        if (!isActivityReadyForUi) return;
        waitingForAppLaunchEvent = false;
        new EventEmitter(context).appLaunched();
    }

    private boolean shouldCreateContext() {
        return !reactInstanceManager.hasStartedCreatingInitialContext();
    }

    @Override
    public void onReactContextInitialized(final ReactContext context) {
        emitAppLaunched(context);
    }
}
