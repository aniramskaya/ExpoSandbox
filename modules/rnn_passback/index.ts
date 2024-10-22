import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RNNPassback.web.ts
// and on native platforms to RNNPassback.ts
import RNNPassbackModule from './src/RNNPassbackModule';
import { ScreenResultPayload, ScreenResult, ScreenError } from './src/RNNPassback.types';

// Get the native constant value.
export const PI = RNNPassbackModule.PI;

export function hello(): string {
  return RNNPassbackModule.hello();
}

// export async function setValueAsync(value: string) {
//   return await RNNPassbackModule.setValueAsync(value);
// }

const emitter = new EventEmitter(RNNPassbackModule ?? NativeModulesProxy.RNNPassback);

export function addScreenResultListener(listener: (event: ScreenResultPayload) => void): Subscription {
  return emitter.addListener<ScreenResultPayload>('onScreenResult', listener);
}

export { ScreenResultPayload, ScreenResult, ScreenError };
