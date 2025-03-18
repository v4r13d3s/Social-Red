import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  publicacion: string = "publicaciones";

  publicaciones = [
    { type: 'texto', content: 'Hola, ¿cómo están?' },
    { type: 'imagen', content: 'https://i.pinimg.com/236x/37/c4/b0/37c4b08ba99248051b86971db5206749.jpg' },
    { type: 'video', content: '' }
  ]

  constructor(public navCtrl: NavController) {}
  
}
