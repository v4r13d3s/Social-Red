import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SearchComponent } from './search/search.component';
<<<<<<< HEAD
import { ComentariosComponent } from '../components/comentarios/comentarios.component';
=======
>>>>>>> 7aa56c9086a087777e9008df2ebdcfc17e9c9f23
import { CardPostComponent } from './card-post/card-post.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        SearchComponent,
<<<<<<< HEAD
        ComentariosComponent,
=======
>>>>>>> 7aa56c9086a087777e9008df2ebdcfc17e9c9f23
        CardPostComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule
    ],
    exports: [
        SearchComponent,
<<<<<<< HEAD
        ComentariosComponent,
=======
>>>>>>> 7aa56c9086a087777e9008df2ebdcfc17e9c9f23
        CardPostComponent,
    ]
})
export class ComponentsModule { }
