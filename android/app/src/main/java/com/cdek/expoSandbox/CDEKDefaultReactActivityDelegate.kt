package com.cdek.expoSandbox

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate

public open class CDEKDefaultReactActivityDelegate(
    activity: ReactActivity,
    mainComponentName: String?,
    private val fabricEnabled: Boolean = false,
) : ReactActivityDelegate(activity, mainComponentName) {

    @Deprecated(
        message =
        "Creating DefaultReactActivityDelegate with both fabricEnabled and " +
                "concurrentReactEnabled is deprecated. Please pass only one boolean value that will" +
                " be used for both flags",
        level = DeprecationLevel.WARNING,
        replaceWith =
        ReplaceWith("DefaultReactActivityDelegate(activity, mainComponentName, fabricEnabled)"))
    public constructor(
        activity: ReactActivity,
        mainComponentName: String,
        fabricEnabled: Boolean,
        @Suppress("UNUSED_PARAMETER") concurrentReactEnabled: Boolean,
    ) : this(activity, mainComponentName, fabricEnabled)

    override fun isFabricEnabled(): Boolean = fabricEnabled
}