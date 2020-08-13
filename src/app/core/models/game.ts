import {Platform} from "./platform";

export class Game {
  id: number;
  title: string;
  company: string;
  price: number;
  score: number;
  releaseDate: string;
  amount: number;
  imgUrl: string;
  description: string;
  screenShotsImgUrl: string[];
  genres: string[];
  platforms: Platform[];
  additionalContent: Game[];
  mainGame: Game;

  constructor() {}



}
