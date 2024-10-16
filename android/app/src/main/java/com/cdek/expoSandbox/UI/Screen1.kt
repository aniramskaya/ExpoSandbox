package com.cdek.expoSandbox.UI

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.ui.Alignment
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.unit.sp
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent
import com.reactnativenavigation.R.id.fragment_screen_content
import org.json.JSONObject


class Screen1 : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return ComposeView(requireContext()).apply {
            setContent {
                Column(
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        fontSize = 24.sp,
                        text = "Native screen 1"
                    )
                }

            }
        }
    }
}

class Screen1Component internal constructor(activity: FragmentActivity, props: JSONObject) :
    ExternalComponent {
    // Create the FrameLayout to which we'll attach our Fragment to
    private val content = FrameLayout(activity)

    init {
        content.id = fragment_screen_content
        // Attach the Fragment to the FrameLayout
        activity.supportFragmentManager
            .beginTransaction()
            .add(fragment_screen_content, createFragment(props))
            .commitAllowingStateLoss()
    }

    private fun createFragment(props: JSONObject): Screen1 {
        val fragment: Screen1 = Screen1()
        // Pass the props sent from Js in a bundle
        val args = Bundle()
        args.putString("text", props.optString("text", ""))
        fragment.setArguments(args)
        return fragment
    }

    override fun asView(): View {
        return content
    }
}
