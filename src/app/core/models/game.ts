import {Platform} from "./platform";
import {Genre} from "./genre";

export class Game {
  id: number;
  title: string;
  company: string;
  price: number;
  score: number;
  releaseDate: string;
  amount: number;
  titleImgUrl: string;
  description: string;
  screenShotsImgUrl: string[];
  genres: Genre[];
  platforms: Platform[];
  additionalContent: Game[];

  constructor() {}



}
