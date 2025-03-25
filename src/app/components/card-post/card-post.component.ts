import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
  standalone: false
})
export class CardPostComponent implements OnInit {
  @Input() username: string | null = null;
  @Input() mediaType: string = '';
  @Input() mediaContent: string = '';
  @Input() likes: number = 0;

  // Array de imágenes y videos disponibles
  images: string[] = [
    'assets/img/totoro.jpg',
    'assets/img/monito.jpg',
    'assets/img/usuario.jpg', // Aquí agregarás todas las imágenes que quieras
  ];

  videos: string[] = [
    'assets/videos/please.mp4' // Aquí agregarás todos los videos que quieras
  ];

  // Para evitar que se repitan imágenes y videos
  usedImages: string[] = [];
  usedVideos: string[] = [];

  // Variable para el contenido random
  publicacion: any = {
    likes: 17_636,
    type: '',  // 'texto', 'imagen', 'video'
    content: '',  // URL de la imagen o video
  };

  private _authService = inject(AuthService);
  mostrarComentarios: boolean = false;

  constructor() {}

  ngOnInit() {
    // Si no se pasa el username, se obtiene desde el servicio
    if (!this.username) {
      this.username = this._authService.getUserName();
    }

    // Seleccionar tipo de contenido aleatorio
    this.randomizarContenido();
  }

  randomizarContenido() {
    // Generar un número aleatorio para decidir si es una imagen o un video
    const randomType = Math.random() > 0.5 ? 'imagen' : 'video';

    if (randomType === 'imagen') {
      this.publicacion.type = 'imagen';
      // Elegir una imagen aleatoria que no se haya usado
      const availableImages = this.images.filter(img => !this.usedImages.includes(img));
      if (availableImages.length > 0) {
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
        this.publicacion.content = randomImage;
        this.usedImages.push(randomImage); // Marcar la imagen como usada
      } else {
        // Si ya no hay imágenes disponibles, reiniciar el arreglo
        this.usedImages = [];
        this.randomizarContenido(); // Vuelve a intentar
      }
    } else {
      this.publicacion.type = 'video';
      // Elegir un video aleatorio que no se haya usado
      const availableVideos = this.videos.filter(vid => !this.usedVideos.includes(vid));
      if (availableVideos.length > 0) {
        const randomVideo = availableVideos[Math.floor(Math.random() * availableVideos.length)];
        this.publicacion.content = randomVideo;
        this.usedVideos.push(randomVideo); // Marcar el video como usado
      } else {
        // Si ya no hay videos disponibles, reiniciar el arreglo
        this.usedVideos = [];
        this.randomizarContenido(); // Vuelve a intentar
      }
    }
  }

  abrirComentarios() {
    this.mostrarComentarios = true;
    this.cargarComentarios();
  }

  cerrarComentarios() {
    this.mostrarComentarios = false;
  }

  totalComentarios: number = 0; // Inicialmente en 0 o el valor que desees

  cargarComentarios() {
    // Aquí podrías cargar los comentarios de una API o base de datos
    const comentarios = [
      { id: 1, texto: '¡Gran post!' },
      { id: 2, texto: 'Me encantó esta publicación.' },
      { id: 3, texto: 'Muy interesante.' }
    ];

    // Actualizar el contador con la cantidad de comentarios
    this.totalComentarios = comentarios.length;
  }

}
