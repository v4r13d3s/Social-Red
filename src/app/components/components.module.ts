import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search/search.component';
import { CardPostComponent } from './card-post/card-post.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        SearchComponent,
        CardPostComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule
    ],
    exports: [
        SearchComponent,
        CardPostComponent,
    ]
})
export class ComponentsModule { }
