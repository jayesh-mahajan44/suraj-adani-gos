import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageInspectionManagementSystem1Component } from './damage-inspection-management-system1.component';

describe('DamageInspectionManagementSystem1Component', () => {
  let component: DamageInspectionManagementSystem1Component;
  let fixture: ComponentFixture<DamageInspectionManagementSystem1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageInspectionManagementSystem1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageInspectionManagementSystem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
