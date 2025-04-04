import { Component, inject } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { StatusPopoverComponent } from '../status-popover/status-popover.component';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  private _authService = inject(AuthService);
  username: String | null = null;

  // Estado de conexión que se actualizará
  connectionStatus: string = 'En línea'; // Inicialmente está en línea
  circleColor: string = 'green'; // Círculo verde cuando está en línea

  isPopoverOpen = false; // Estado del popover
  popoverEvent: any;

  // Datos de publicaciones
  publicaciones = [
    { type: 'texto', content: 'Este es un texto de ejemplo', likes: 5 },
    { type: 'imagen', content: 'assets/img/ejemplo_imagen.jpg', likes: 12 },
    { type: 'video', content: 'assets/videos/ejemplo_video.mp4', likes: 25 }
  ];

  constructor(private popoverController: PopoverController, private router: Router) {}

  // Función para presentar el popover
  async presentPopover(event: any) {
    const popover = await this.popoverController.create({
      component: StatusPopoverComponent,  // Componente que contiene las opciones
      event: event,
      translucent: true,
    });

    popover.onDidDismiss().then((result) => {
      if (result.data) {
        this.connectionStatus = result.data; // Actualiza el estado de conexión

        // Cambiar el color del círculo según el estado
        if (this.connectionStatus === 'En línea') {
          this.circleColor = 'green'; // Verde para "En línea"
        } else {
          this.circleColor = 'gray'; // Gris para "Sin conexión"
        }
      }
    });

    return await popover.present();
  }

  // Función para abrir el popover (en caso de que lo necesites en otro lugar)
  openPopover(event: Event) {
    this.popoverEvent = event;
    this.isPopoverOpen = true;
  }

  editarPerfil() {
    // Redirige al tab3
    this.router.navigate(['/tabs/tab3']);
  }

  cerrarSesion() {
    console.log("Cerrando sesión...");

    // Elimina cualquier dato relacionado con la sesión
    localStorage.removeItem('token'); // Si guardas el token en localStorage
    sessionStorage.removeItem('token'); // Si guardas el token en sessionStorage
    this._authService.cerrarSesion(); // Si tienes algún servicio que maneje la lógica de la sesión

    // Redirige al login o a la página principal
    this.router.navigate(['/login']); // Asegúrate de tener acceso al router
  }

  ngOnInit() {
    this.username = this._authService.getUserName();
  }
}