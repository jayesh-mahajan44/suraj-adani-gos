import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InGateComponent } from './in-gate.component';

describe('InGateComponent', () => {
  let component: InGateComponent;
  let fixture: ComponentFixture<InGateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InGateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InGateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
