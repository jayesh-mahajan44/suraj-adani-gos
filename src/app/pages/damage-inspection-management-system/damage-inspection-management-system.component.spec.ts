import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageInspectionManagementSystemComponent } from './damage-inspection-management-system.component';

describe('DamageInspectionManagementSystemComponent', () => {
  let component: DamageInspectionManagementSystemComponent;
  let fixture: ComponentFixture<DamageInspectionManagementSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageInspectionManagementSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageInspectionManagementSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
