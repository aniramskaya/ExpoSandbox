package expo.modules.rnn_passback

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URI
import java.util.UUID
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class RNNPassbackModule : Module() {
  companion object {
    // Class property (shared by all instances)
    var shared: RNNPassbackModule? = null
  }

  fun setScreenResult(id: String, result: ScreenResult) {
    when (result) {
      is Success -> sendEvent("onScreenResult", mapOf(
        "id" to id,
        "status" to mapOf("data" to result.data)
      ))
      is Error -> sendEvent("onScreenResult", mapOf(
        "id" to id,
        "status" to mapOf("value" to result.value)
      ))
    }
  }

  fun navigateToUrl(url: URI, params: Map<String, Any?>) {
    sendEvent("onNavigateToUrl", mapOf("requestId" to null, "url" to url.toString(), "props" to params))
  }

  private val navigationCallbacks: MutableMap<String,(Result<Map<String, Any?>>) -> Unit> = mutableMapOf()

  fun navigateToUrl(url: URI, params: Map<String, Any?>, callback: (Result<Map<String, Any?>>) -> Unit) {
    val requestId = UUID.randomUUID().toString()
    navigationCallbacks[requestId] = callback
    val payload = mapOf("requestId" to requestId, "url" to url.toString(), "props" to params)
    sendEvent("onNavigateToUrl", payload)
  }

  fun parseJsonToMap(jsonString: String): Map<String, Any?> {
    val gson = Gson()
    val mapType = object : TypeToken<Map<String, Any?>>() {}.type
    return gson.fromJson(jsonString, mapType)
  }

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    OnCreate {
      shared = this@RNNPassbackModule
    }

    OnDestroy {
      shared = null
    }
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('RNNPassback')` in JavaScript.
    Name("RNNPassback")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants(
      "PI" to Math.PI
    )

    // Defines event names that the module can send to JavaScript.
    Events("onScreenResult", "onNavigateToUrl")

    Function("passNavigationResult") { requestId: String, result: String ->
      val callback = navigationCallbacks[requestId].let { it } ?: return@Function
      navigationCallbacks.remove(requestId)
      val mapResult = parseJsonToMap(result)
      when {
        mapResult["data"] is Map<*, *> -> {
          val data = mapResult["data"] as Map<String, Any?>
          callback(Result.success(data))
        }
        mapResult["value"] is String -> {
          val value = mapResult["value"] as String
          callback(Result.failure(UrlNavigationException(value)))
        }
        else -> {
          callback(Result.failure(UrlNavigationException("Couldn't parse navigation result")))
        }
      }
      return@Function
    }

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

//    // Defines a JavaScript function that always returns a Promise and whose native code
//    // is by default dispatched on the different thread than the JavaScript runtime runs on.
//    AsyncFunction("setValueAsync") { value: String ->
//      // Send an event to JavaScript.
//      sendEvent("onChange", mapOf(
//        "value" to value
//      ))
//    }
  }
}
