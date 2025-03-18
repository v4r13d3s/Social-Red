import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular'; // Importa ToastController
import { AuthService } from '../../auth.service';

export interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _toastController = inject(ToastController); // Inyecta ToastController

  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
  });

  async submit() {
    if (this.form.invalid) {
      this.showToast(
        'Por favor, completa todos los campos correctamente.',
        'danger'
      );
      return;
    }

    const { email, password } = this.form.value;

    if (!email || !password) {
      this.showToast(
        'Por favor, proporciona un correo electrónico y una contraseña.',
        'danger'
      );
      return;
    }

    try {
      const isEmailInFirestore = await this._authService.isEmailInFirestore(
        email
      );

      if (isEmailInFirestore) {
        try {
          await this._authService.signIn({ email, password });
          this.showToast('Inicio de sesión exitoso', 'success');
          this._router.navigateByUrl('/tabs/tab1');
        } catch (error: any) {
          // Manejar errores específicos de autenticación
          if (error.message === 'Contraseña incorrecta') {
            this.showToast(
              'La contraseña es incorrecta. Por favor, verifica tus credenciales.',
              'danger'
            );
          } else if (error.message === 'Usuario no encontrado') {
            this.showToast(
              'No se encontró ninguna cuenta con este correo electrónico.',
              'danger'
            );
          } else {
            this.showToast(
              'Error al iniciar sesión: ' + error.message,
              'danger'
            );
          }
        }
      } else {
        this.showToast('El correo no está registrado.', 'danger');
      }
    } catch (error: any) {
      console.error('Error en el proceso:', error);
      this.showToast(
        'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.',
        'danger'
      );
    }
  }

  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      this.showToast('Bienvenido', 'success');
      this._router.navigateByUrl('/tabs/tab1');
    } catch (error) {
      this.showToast('Ocurrió un error al iniciar sesión con Google', 'danger');
    }
  }

  // Método para mostrar toasts
  async showToast(message: string, color: string = 'primary') {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      cssClass: `toast-${color}`, // Opcional: puedes agregar clases CSS personalizadas
    });

    await toast.present();
  }
}
