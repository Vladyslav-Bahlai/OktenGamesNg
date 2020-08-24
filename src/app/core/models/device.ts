
import {Gamepad} from './gamepad';

export class Device {

  id: number;
  title: string;
  imgUrl: string;
  price: number;
  amount: number;
  color: string;
  capacity: string;
  conditionState: string;
  photosImgUrl: string[];
  gamepads: Gamepad[];

  constructor() {
  }
}
