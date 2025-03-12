import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CardPostComponent } from './card-post/card-post.component';


@NgModule({
  declarations: [
    CardPostComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CardPostComponent,
  ]
})
export class ComponentsModule { }
