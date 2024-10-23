package com.cdek.expoSandbox.UI

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.material.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.unit.sp
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentActivity
import com.reactnativenavigation.viewcontrollers.externalcomponent.ExternalComponent
import com.reactnativenavigation.R.id.fragment_screen_content
import expo.modules.rnn_passback.RNNPassbackModule
import expo.modules.rnn_passback.Success
import org.json.JSONObject
import java.net.URI


class TextDisplayScreen : Fragment() {
    var screenId: String? = null
    var text: String = "Hello, world!"

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        screenId = arguments?.getString("screenId")
        return ComposeView(requireContext()).apply {
            setContent {
                var currentText by rememberSaveable {
                    mutableStateOf( text )
                }

                val processResponse: (Result<Map<String, Any?>>) -> Unit = { response ->
                    response.fold(
                        onSuccess = { value ->
                            currentText = (value.getValue("text") as? String) ?: currentText
                        },
                        onFailure = { error ->
                            Log.d("UrlNavigation", "Text editing error", error)
                        }
                    )
                }

                Column(
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        fontSize = 24.sp,
                        text = "This is native Android fragment"
                    )
                    Text(
                        fontSize = 17.sp,
                        text = "You can edit the text in the next screen"
                    )
                    Text(
                        fontSize = 17.sp,
                        text = currentText,
                    )
                    OutlinedButton (
                        onClick = {
                            RNNPassbackModule.shared?.navigateToUrl(
                                URI("rnn:///native-text-edit-screen/"),
                                mapOf("data" to currentText),
                                { response ->
                                    activity?.runOnUiThread { processResponse(response) }
                                }
                            )
                        },
                    ) { Text(text = "Tap to edit")}
                    OutlinedButton (
                        onClick = {
                            currentText = currentText + "AAA"
                        },
                    ) { Text(text = "Change the text")}
                }
            }
        }
    }

    override fun onPause() {
        super.onPause()
        Log.d("UI", "TextDisplayFragment paused")
    }

    override fun onResume() {
        super.onResume()
        Log.d("UI", "TextDisplayFragment resumed")
    }
}

class TextDisplayScreenComponent internal constructor(activity: FragmentActivity, props: JSONObject) :
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

    private fun createFragment(props: JSONObject): TextDisplayScreen {
        val fragment: TextDisplayScreen = TextDisplayScreen()
        // Pass the props sent from Js in a bundle
        val args = Bundle()
        args.putString("screenId", props.optString("id", ""))
        fragment.setArguments(args)
        return fragment
    }

    override fun asView(): View {
        return content
    }
}
