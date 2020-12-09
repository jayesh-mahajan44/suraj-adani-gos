import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCaptureComponentComponent } from './image-capture-component.component';

describe('ImageCaptureComponentComponent', () => {
  let component: ImageCaptureComponentComponent;
  let fixture: ComponentFixture<ImageCaptureComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCaptureComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCaptureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
