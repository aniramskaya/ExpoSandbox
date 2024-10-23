package expo.modules.rnn_passback

sealed class ScreenResult

data class Success(val data: Map<String, Any?>) : ScreenResult()
data class Error(val value: String) : ScreenResult()
