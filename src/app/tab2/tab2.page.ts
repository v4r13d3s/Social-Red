import { Component, OnInit } from '@angular/core';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  caption?: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  mediaItems: MediaItem[] = [];

  constructor() {}

  
  ngOnInit() {
    this.mediaItems = [
      { type: 'image', src: 'assets/img/Luffy.jpg', caption: 'oh oh oh' },
      { type: 'image', src: 'assets/img/niki.jpg', caption: 'Fun Times' },
      { type: 'image', src: 'assets/img/chica.jpg', caption: 'Stylish' },
      { type: 'image', src: 'assets/img/flores-f.jpg', caption: 'Cool Vibes' }, // Nueva fila 1
      { type: 'image', src: 'assets/img/perro.jpg', caption: 'Adventure Time' },
      { type: 'image', src: 'assets/img/gato.jpg', caption: 'Chilling' },
      { type: 'image', src: 'assets/img/chi.jpg', caption: 'Highlights' }, // Nueva fila 2
      { type: 'image', src: 'assets/img/elrubius.jpg', caption: 'Epic Views' },
      { type: 'image', src: 'assets/img/cora.jpg', caption: 'Moments' },
      { type: 'image', src: 'assets/img/totoro.jpg', caption: 'Memories' }, // Nueva fila 3
      { type: 'image', src: 'assets/img/niki.jpg', caption: 'Fun Times' },
      { type: 'image', src: 'assets/img/luffy-l.jpg', caption: 'Scenic' },
      { type: 'image', src: 'assets/img/Luffy.jpg', caption: 'oh oh oh' },
      { type: 'image', src: 'assets/img/elrubius.jpg', caption: 'Epic Views' },
      { type: 'image', src: 'assets/img/chica.jpg', caption: 'Stylish' },
      { type: 'image', src: 'assets/img/Luffy.jpg', caption: 'oh oh oh' },
      { type: 'image', src: 'assets/img/cora.jpg', caption: 'Moments' },
      { type: 'image', src: 'assets/img/chica.jpg', caption: 'Stylish' },
    ];
  }

  
  
}
