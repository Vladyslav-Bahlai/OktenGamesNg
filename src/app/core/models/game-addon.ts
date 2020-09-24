import {Game} from "./game";
import {GameBase} from "./game-base";

export class GameAddon extends GameBase {
  mainGame: Game;

  constructor() {
    super();
  }
}
