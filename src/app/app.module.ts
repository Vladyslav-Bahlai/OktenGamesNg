import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {GameMasterComponent} from './shared/components/game-master/game-master.component';
import {GameComponent} from './shared/components/game/game.component';
import {HttpClientModule} from '@angular/common/http';
import { GameFormComponent } from './shared/components/game-form/game-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DeviceComponent} from './shared/components/device/device.component';
import {GamepadComponent} from './shared/components/gamepad/gamepad.component';
import {GamepadMasterComponent} from './shared/components/gamepad-master/gamepad-master.component';
import { DeviceMasterComponent } from './shared/components/device-master/device-master.component';
import { GameAddonFormComponent } from './shared/components/game-addon-form/game-addon-form.component';
import { GenresTableComponent } from './shared/components/genres-table/genres-table.component';
import { GameAddonComponent } from './shared/components/game-addon/game-addon.component';
import { GamepadFormComponent } from './shared/components/gamepad-form/gamepad-form.component';
import { ImagesUploaderComponent } from './shared/components/images-uploader/images-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    GameMasterComponent,
    GameComponent,
    GameFormComponent,
    DeviceComponent,
    GamepadComponent,
    GamepadMasterComponent,
    DeviceMasterComponent,
    GameAddonFormComponent,
    GenresTableComponent,
    GameAddonComponent,
    GamepadFormComponent,
    ImagesUploaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
