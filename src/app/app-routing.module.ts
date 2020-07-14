import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameMasterComponent} from "./shared/components/game-master/game-master.component";
import {GameComponent} from "./shared/components/game/game.component";
import {GameResolverService} from "./core/resolvers/game-resolver.service";


const routes: Routes = [
  {
    path: 'games',
    component: GameMasterComponent,
    resolve: {
      games: GameResolverService
    }
  },
  {
    path: 'games/:id',
    component: GameComponent,
    resolve: {
      games: GameResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
