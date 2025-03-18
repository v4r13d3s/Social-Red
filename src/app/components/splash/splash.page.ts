import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone:false
})
export class SplashPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Tiempo en milisegundos que se mostrará la pantalla de splash
    setTimeout(() => {
      this.router.navigateByUrl('/welcome');
    }, 3000); // 3 segundos, puedes ajustar este valor
  }
}
