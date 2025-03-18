import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

interface Comentario {
  id: number;
  usuario: any;
  texto: string;
  avatarUrl: string;
  tiempo: string;
  likes: number;
  userLiked: boolean;
}

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
  standalone: false,
})

export class ComentariosComponent implements OnInit {
  @Input() postId: number = 0;
  @Output() close = new EventEmitter<void>();

  private _authService = inject(AuthService)
  username: String | null = null;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  hayMasComentarios: boolean = false;
  paginaActual: number = 1;

  constructor() { }

  ngOnInit() {
    this.abriComentarios();
    this.username = this._authService.getUserName();
  }

  // Método para manejar el evento ionInput con tipado correcto
  manejarInput(event: Event) {
    const input = event.target as HTMLIonInputElement;
    if (input.value !== undefined && input.value !== null) {
      this.nuevoComentario = input.value.toString();
    }
  }

  abriComentarios() {
    const comentariosEjemplo: Comentario[] = [
      {
        id: 1,
        usuario: 'maria_lopez',
        texto: 'Qué lindos se ven juntos! ❤️',
        avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        tiempo: '2d',
        likes: 24,
        userLiked: false
      },
      {
        id: 2,
        usuario: 'juan_garcia',
        texto: 'Se ven muy felices, felicidades!',
        avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        tiempo: '1d',
        likes: 15,
        userLiked: true
      },
      {
        id: 3,
        usuario: 'ana_martinez',
        texto: 'Qué lugar tan bonito! ¿Dónde es?',
        avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        tiempo: '23h',
        likes: 8,
        userLiked: false
      },
      {
        id: 4,
        usuario: 'pedro_sanchez',
        texto: 'Grandes momentos! 👏',
        avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        tiempo: '12h',
        likes: 5,
        userLiked: false
      },
      {
        id: 5,
        usuario: 'laura_diaz',
        texto: 'Me encanta verlos tan felices! 💕',
        avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        tiempo: '5h',
        likes: 12,
        userLiked: false
      },
      {
        id: 6,
        usuario: 'carlos_ruiz',
        texto: 'Disfruten mucho! 🎉',
        avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        tiempo: '1h',
        likes: 3,
        userLiked: false
      }
    ];

    this.comentarios = comentariosEjemplo;
    this.hayMasComentarios = this.comentarios.length >= 5;
  }

  cargarMasComentarios() {
    this.paginaActual++;
    // Aquí cargarías más comentarios desde tu API
    // Para este ejemplo, simplemente desactivamos el botón
    this.hayMasComentarios = false;
  }

  publicarComentario() {
    if (this.nuevoComentario.trim()) {
      const nuevoComentario: Comentario = {
        id: this.comentarios.length + 1,
        usuario: this.username || 'usuario_anonimo', 
        texto: this.nuevoComentario,
        avatarUrl: 'https://ionicframework.com/docs/img/demos/avatar.svg',
        tiempo: 'ahora',
        likes: 0,
        userLiked: false
      };

      this.comentarios.unshift(nuevoComentario);
      this.nuevoComentario = '';
    }
  }

  cerrarComentarios() {
  this.close.emit();

}

  toggleLike(comentario: Comentario) {
    comentario.userLiked = !comentario.userLiked;
    comentario.likes += comentario.userLiked ? 1 : -1;
  }
}