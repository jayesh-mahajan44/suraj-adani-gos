import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTransactionMappingPageComponent } from './import-transaction-mapping-page.component';

describe('ImportTransactionMappingPageComponent', () => {
  let component: ImportTransactionMappingPageComponent;
  let fixture: ComponentFixture<ImportTransactionMappingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportTransactionMappingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportTransactionMappingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
