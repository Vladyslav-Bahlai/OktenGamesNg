import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameMasterComponent} from "./shared/components/game-master/game-master.component";
import {GameComponent} from "./shared/components/game/game.component";


const routes: Routes = [
  {
    path: 'games',
    component: GameMasterComponent,
  },
  {
    path: 'games/:id',
    component: GameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
