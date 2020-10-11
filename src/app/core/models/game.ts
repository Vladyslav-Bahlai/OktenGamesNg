import {Platform} from "./platform";
import {Genre} from "./genre";
import {GameBase} from "./game-base";

export class Game extends GameBase{
  genres: Genre[];
  platforms: Platform[];
  additionalContent: Game[];

  constructor() {
    super();
  }



}
