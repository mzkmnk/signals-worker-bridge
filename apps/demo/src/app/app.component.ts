import { Component, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createSignalWorkerBridge } from '@mzkmnk-lab/signal-worker-bridge';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <p>num:{{ this.num() }}</p>
      <p>signalWorker:{{ signalWorker.value() }}</p>
      <button (click)="onClick()">Click</button>
    </div>
  `,
})
export class AppComponent {
  title = 'demo';

  num = signal<number>(0);
  signalWorker = createSignalWorkerBridge(this.num, (num) => {
    const calcFibonacci = (n: number): number => {
      if (n <= 1) return n;

      return calcFibonacci(n - 1) + calcFibonacci(n - 2);
    };

    return calcFibonacci(num);
  });

  constructor() {
    effect(() => {
      console.log('signalWorker', this.signalWorker.value());
    });
  }

  onClick(): void {
    this.num.update((val) => val + 1);
  }
}
