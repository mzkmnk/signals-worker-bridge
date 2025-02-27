import { effect, signal, Signal, WritableSignal } from '@angular/core';

export class SignalWorker<T, R> {
  private errorSignal = signal<Error | undefined>(undefined);
  private worker: Worker;

  constructor(
    private inputSignal: Signal<T>,
    private processFn: (input: T) => Promise<R> | R,
    private resultSignal: WritableSignal<R | undefined> = signal(undefined)
  ) {
    this.worker = this.createWorker(this.processFn);

    effect(() => {
      const input = this.inputSignal();
      console.log('input', input);
      this.worker.postMessage(input);
    });
  }

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  createWorker(fn: Function): Worker {
    const fnString = fn.toString();

    const workerCode = `
      self.onmessage = (event) => {
        try{
          const fn = ${fnString};

          console.log(fn);

          const result = fn(event.data);

          self.postMessage({
            type:'result',
            data: result
          });
        }catch(error){
          console.log('catch',error);
          self.postMessage({
            type:'error',
            message: error.message,
            stack:error.stack
          });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });

    const url = URL.createObjectURL(blob);

    const worker = new Worker(url);

    worker.onmessage = (event) => {
      if (event.data.type === 'result') {
        this.resultSignal.set(event.data.data);
      }

      const workerError = new Error(event.data.message);
      this.errorSignal.set(workerError);
    };

    worker.onerror = (event) => {
      console.log(event);
      this.errorSignal.set(new Error(event.message));
    };

    return worker;
  }

  terminate(): void {
    this.worker.terminate();
  }
}
