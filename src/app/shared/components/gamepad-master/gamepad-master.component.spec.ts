import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamepadMasterComponent } from './gamepad-master.component';

describe('GamepadMasterComponent', () => {
  let component: GamepadMasterComponent;
  let fixture: ComponentFixture<GamepadMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamepadMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamepadMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
