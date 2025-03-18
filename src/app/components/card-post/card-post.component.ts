import { Component, OnInit } from '@angular/core';
import { ComentariosComponent } from '../comentarios/comentarios.component';


@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  standalone: false
})
export class CardPostComponent  implements OnInit {
  mostrarComentarios: boolean = false;

  constructor() { }

  ngOnInit() {}

  abrirComentarios() {
    this.mostrarComentarios = true;
  }

  cerrarComentarios() {
    this.mostrarComentarios = false;
  }

}
