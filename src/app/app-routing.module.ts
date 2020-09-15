import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameMasterComponent} from "./shared/components/game-master/game-master.component";
import {GameComponent} from "./shared/components/game/game.component";
import {GameFormComponent} from "./shared/components/game-form/game-form.component";
import {GameAddonComponent} from "./shared/components/game-addon/game-addon.component";


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
    path: 'addons/:id',
    component: GameAddonComponent,
  },
  {
    // add guards to restrict permission for regular users
    path: 'forms/add-game',
    component: GameFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
