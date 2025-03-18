import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage {
  user: User = { email: '', password: '' };
  additionalData = { nombre: '', apellido: '', ciudad: '' };
  errorMessage: string = ''; // Para mostrar mensajes de error

  constructor(public authService: AuthService, private router: Router) {}

  async onSignUp() {
    try {
      // Verifica primero si el correo ya está registrado
      const isRegistered = await this.authService.isEmailRegistered(
        this.user.email
      );
      if (isRegistered) {
        this.errorMessage =
          'El correo electrónico ya está registrado. Por favor, use otro correo o inicie sesión.';
        return;
      }

      // Si no está registrado, procede con el registro
      await this.authService.signUp(this.user, this.additionalData);
      this.router.navigate(['tabs/tab1']);
    } catch (error: unknown) {
      console.error('Error en el registro:', error);

      // Manejo específico para diferentes tipos de errores de Firebase
      if (error instanceof Error) {
        if (error.message.includes('auth/email-already-in-use')) {
          this.errorMessage =
            'Este correo electrónico ya está en uso. Por favor, use otro correo o inicie sesión.';
        } else if (error.message.includes('auth/weak-password')) {
          this.errorMessage =
            'La contraseña es demasiado débil. Use al menos 6 caracteres.';
        } else if (error.message.includes('auth/invalid-email')) {
          this.errorMessage = 'El formato del correo electrónico es inválido.';
        } else {
          this.errorMessage = error.message || 'Ocurrió un error desconocido';
        }
      } else {
        this.errorMessage = 'Ocurrió un error desconocido';
      }
    }
  }
}
