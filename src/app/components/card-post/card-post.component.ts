import { Component, OnInit, inject } from '@angular/core';
import { ComentariosComponent } from '../comentarios/comentarios.component';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  standalone: false
})
export class CardPostComponent  implements OnInit {
  private _authService = inject(AuthService)
  username: String | null = null;

  mostrarComentarios: boolean = false;

  constructor() { }

  abrirComentarios() {
    this.mostrarComentarios = true;
  }

  cerrarComentarios() {
    this.mostrarComentarios = false;
  }

  ngOnInit(){
    this.username = this._authService.getUserName();
  }

}
