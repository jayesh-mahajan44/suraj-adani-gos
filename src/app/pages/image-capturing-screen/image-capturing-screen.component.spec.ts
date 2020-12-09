import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCapturingScreenComponent } from './image-capturing-screen.component';

describe('ImageCapturingScreenComponent', () => {
  let component: ImageCapturingScreenComponent;
  let fixture: ComponentFixture<ImageCapturingScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCapturingScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCapturingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
