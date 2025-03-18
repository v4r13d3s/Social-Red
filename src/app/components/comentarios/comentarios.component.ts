// comentarios.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Emoji } from 'emoji-mart';
interface Comentario {
  id: number;
  usuario: string;
  texto: string;
  likes: number;
  respuestas?: Comentario[];
  showReplyBox?: boolean;
}

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
  standalone: false,

})
export class ComentariosComponent {
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  mostrarEmojiPicker = false; 

  agregarComentario() {
    if (this.nuevoComentario.trim()) {
      this.comentarios.push({
        id: Date.now(),
        usuario: 'Usuario',
        texto: this.nuevoComentario,
        likes: 0,
        respuestas: []
      });
      this.nuevoComentario = '';
    }
  }

  darLike(comentario: Comentario) {
    comentario.likes++;
  }

  responderComentario(comentario: Comentario, respuestaTexto: string) {
    if (respuestaTexto.trim()) {
      comentario.respuestas?.push({
        id: Date.now(),
        usuario: 'Usuario',
        texto: respuestaTexto,
        likes: 0,
      });
    }
  }

  toggleReplyBox(comentario: Comentario) {
    comentario.showReplyBox = !comentario.showReplyBox;
  }

  agregarEmoji(event: any) {
    this.nuevoComentario += event.emoji.native; // Agrega el emoji al comentario
  }

  // Método para mostrar/ocultar el picker de emojis
  toggleEmojiPicker() {
    this.mostrarEmojiPicker = !this.mostrarEmojiPicker; // Cambiar la propiedad para mostrar/ocultar el emoji picker
  }
}
