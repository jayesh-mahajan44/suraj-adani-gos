import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTransactionMappingPageComponent } from './export-transaction-mapping-page.component';

describe('ExportTransactionMappingPageComponent', () => {
  let component: ExportTransactionMappingPageComponent;
  let fixture: ComponentFixture<ExportTransactionMappingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportTransactionMappingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportTransactionMappingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
