import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddonFormComponent } from './game-addon-form.component';

describe('GameAddonFormComponent', () => {
  let component: GameAddonFormComponent;
  let fixture: ComponentFixture<GameAddonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameAddonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAddonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
