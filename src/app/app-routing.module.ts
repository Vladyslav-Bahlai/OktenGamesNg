import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameMasterComponent} from './shared/components/game-master/game-master.component';
import {GameComponent} from './shared/components/game/game.component';
import {GameFormComponent} from './shared/components/game-form/game-form.component';
import {GamepadMasterComponent} from './shared/components/gamepad-master/gamepad-master.component';
import {DeviceMasterComponent} from './shared/components/device-master/device-master.component';
import {DeviceComponent} from './shared/components/device/device.component';
import {GamepadComponent} from './shared/components/gamepad/gamepad.component';
import {GamepadFormComponent} from './shared/components/gamepad-form/gamepad-form.component';


const routes: Routes = [
  {
    path: 'games',
    component: GameMasterComponent,
  },
  {
    path: 'games/:id',
    component: GameComponent,
  },
  {
    // add guards to restrict permission for regular users
    path: 'forms/add-game',
    component: GameFormComponent
  },
  {
    // add guards to restrict permission for regular users
    path: 'forms/add-gamepad',
    component: GamepadFormComponent
  },
  {
    path: 'gamepads',
    component: GamepadMasterComponent,
  },
  {
    path: 'devices',
    component: DeviceMasterComponent,
  },
  {
    path: 'devices/:id',
    component: DeviceComponent,
  },
  {
    path: 'gamepads/:id',
    component: GamepadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
