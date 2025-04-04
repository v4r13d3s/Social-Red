import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search/search.component';
import { ComentariosComponent } from '../components/comentarios/comentarios.component'; // Este es el componente Comentarios
import { CardPostComponent } from './card-post/card-post.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    declarations: [
        SearchComponent,
        ComentariosComponent, // Asegúrate de que el componente Comentarios esté incluido
        CardPostComponent,
        LayoutComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule
    ],
    exports: [
        SearchComponent,
        ComentariosComponent, // Exponiendo el componente Comentarios
        CardPostComponent,
        LayoutComponent
    ]
})
export class ComponentsModule { }
