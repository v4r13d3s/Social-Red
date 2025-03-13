import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search/search.component';
import { ComentariosComponent } from '../components/comentarios/comentarios.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        SearchComponent,
        ComentariosComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule
    ],
    exports: [
        SearchComponent,
        ComentariosComponent
    ]
})
export class ComponentsModule { }