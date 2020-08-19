import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {TabPage, TabPopoverComponent} from './tab.page';

import { Tab1PageRoutingModule } from './tab-routing.module';
import {TouchPadComponent} from '../components/touch-pad/touch-pad.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [TabPage, TabPopoverComponent, TouchPadComponent]
})
export class TabPageModule {}
