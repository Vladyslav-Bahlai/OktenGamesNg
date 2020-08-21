import {Component, OnInit, Renderer2} from '@angular/core';
import {GameFormComponent} from "../game-form/game-form.component";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {GameService} from "../../../core/services/game.service";
import {GameStorageService} from "../../../core/services/game-storage.service";

@Component({
  selector: 'app-game-addon-form',
  templateUrl: './game-addon-form.component.html',
  styleUrls: ['./game-addon-form.component.scss']
})
export class GameAddonFormComponent implements OnInit {

  private reactiveFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }


  ngOnInit() {
    this.reactiveFormGroup = this.formBuilder.group({
      title: '',
      price: '',
      score: '',
      releaseDate: '',
      amount: '',
      imgUrl: '',
      description: '',
    });
  }

}
