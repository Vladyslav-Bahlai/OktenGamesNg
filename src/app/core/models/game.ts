
export class Game {

  id: number;
  title: string;
  amount: number;
  price: number;
  score: number;
  imgUrl: string;
  description: string;
  releaseDate: string;
  company: string;
  screenShotsImgUrl: string[];
  genres: string[];
  platforms: string[];
  additionalContent: Game[];
  mainGame: Game;

  constructor() {
  }
}
