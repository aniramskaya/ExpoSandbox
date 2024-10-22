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


class TextEditScreen : Fragment() {
    var screenId: String? = null
    var text: String? = null

    fun onDone() {
        val id = screenId?.let { it } ?: return
        val text = text?.let { it } ?: return
        RNNPassbackModule.shared?.setScreenResult(id, Success(data = mapOf( "text" to text)))
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        screenId = arguments?.getString("screenId")
        text = arguments?.getString("text")
        return ComposeView(requireContext()).apply {
            setContent {
                var currentText by remember { mutableStateOf( text ?: "") }

                Column(
                    verticalArrangement = Arrangement.Center,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        fontSize = 24.sp,
                        text = "This is native Android fragment"
                    )
                    TextField(
                        value = currentText,
                        onValueChange = { newValue ->
                            currentText = newValue
                            text = newValue
                        },
                        label = { Text(text = "You can edit the text here") }
                    )
                    OutlinedButton (
                        onClick = { onDone() },
                    ) { Text(text = "Tap to confirm changes")}
                }
            }
        }
    }


    override fun onDestroyView() {
        super.onDestroyView()
        Log.d("Fragment", "Screen1 view destroyed")
    }

    override fun onDestroy() {
        super.onDestroy()
        Log.d("Fragment", "Screen1 destroyed")
    }
}

class TextEditScreenComponent internal constructor(activity: FragmentActivity, props: JSONObject) :
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

    private fun createFragment(props: JSONObject): TextEditScreen {
        val fragment: TextEditScreen = TextEditScreen()
        // Pass the props sent from Js in a bundle
        val args = Bundle()
        args.putString("screenId", props.optString("id", ""))
        args.putString("text", props.optString("data", ""))
        fragment.setArguments(args)
        return fragment
    }

    override fun asView(): View {
        return content
    }
}
