import { Component, contentChild, inject } from '@angular/core';
import { NavController } from '@ionic/angular'; 
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  private _authService = inject(AuthService)
  username: String | null = null;

  publicacion: string = "publicaciones";

  publicaciones = [
    { type: 'texto', content: 'Hola, ¿cómo están?' },
    { type: 'imagen', content: 'https://i.pinimg.com/236x/37/c4/b0/37c4b08ba99248051b86971db5206749.jpg' },
    { type: 'video', content: '' },
    { type: 'texto', content: '¡Finalmente lo logré! 🔥 Después de horas de juego, por fin desbloqueé el 100% en mi juego favorito. ¿Alguien más lo ha conseguido? 🎮💪' },
    { type: 'imagen', content: 'data:image/jpeg;base64,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' },
    { type: 'texto', content: 'Nada peor que estar a punto de ganar y que se me apague la consola... 😭🎮 ¿Cuál ha sido tu peor fail en un juego?' },
    { type: 'texto', content: '' }
  ]

  constructor(public navCtrl: NavController) {}
  
  ngOnInit(){
    this.username = this._authService.getUserName();
  }

}
