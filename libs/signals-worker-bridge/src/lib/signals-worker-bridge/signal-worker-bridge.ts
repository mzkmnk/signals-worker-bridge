import { signal, Signal } from '@angular/core';
import { SignalWorker } from './signal-worker';

export function createSignalWorkerBridge<T, R>(
  inputSignal: Signal<T>,
  processFn: (input: T) => Promise<R> | R
) {
  const resultSignal = signal<R | undefined>(undefined);
  const signalWorker = new SignalWorker(inputSignal, processFn, resultSignal);

  return {
    value: resultSignal,
  };
}
