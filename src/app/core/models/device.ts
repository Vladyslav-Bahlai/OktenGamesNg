import {ConditionState} from './conditionState';


export class Device {

  id: number;
  title: string;
  imgUrl: string;
  price: number;
  amount: number;
  // color: string;
  // capacity: string;
  gamepads: number;
  conditionStates: ConditionState[];
  // photosImgUrl: string[];

  constructor() {
  }
}
