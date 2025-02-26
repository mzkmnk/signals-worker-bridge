import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalsWorkerBridgeComponent } from './signals-worker-bridge.component';

describe('SignalsWorkerBridgeComponent', () => {
  let component: SignalsWorkerBridgeComponent;
  let fixture: ComponentFixture<SignalsWorkerBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsWorkerBridgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsWorkerBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
