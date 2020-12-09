import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckTransactionMappingPageComponent } from './truck-transaction-mapping-page.component';

describe('TruckTransactionMappingPageComponent', () => {
  let component: TruckTransactionMappingPageComponent;
  let fixture: ComponentFixture<TruckTransactionMappingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckTransactionMappingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckTransactionMappingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
