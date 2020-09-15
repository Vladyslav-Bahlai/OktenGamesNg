import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepadFormComponent } from './gamepad-form.component';

describe('GamepadFormComponent', () => {
  let component: GamepadFormComponent;
  let fixture: ComponentFixture<GamepadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamepadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamepadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
