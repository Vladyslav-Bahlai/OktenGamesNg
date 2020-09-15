import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddonComponent } from './game-addon.component';

describe('GameAddonComponent', () => {
  let component: GameAddonComponent;
  let fixture: ComponentFixture<GameAddonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
