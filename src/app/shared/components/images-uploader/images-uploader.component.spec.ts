import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesUploaderComponent } from './images-uploader.component';

describe('ImagesUploaderComponent', () => {
  let component: ImagesUploaderComponent;
  let fixture: ComponentFixture<ImagesUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
