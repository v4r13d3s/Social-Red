import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======

import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // Importa Firestore
>>>>>>> 9eae584de40ac827402ed8a4872c97df672d3687
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
<<<<<<< HEAD
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
=======
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'app-movil-d20ed',
        appId: '1:323590396982:web:c5bf31141e20d6eb320c97',
        storageBucket: 'app-movil-d20ed.firebasestorage.app',
        apiKey: 'AIzaSyCVqak0lgpze23t6NAgCrJwiqYkKk1_8LA',
        authDomain: 'app-movil-d20ed.firebaseapp.com',
        messagingSenderId: '323590396982',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
>>>>>>> 9eae584de40ac827402ed8a4872c97df672d3687
  bootstrap: [AppComponent],
})
export class AppModule {}

