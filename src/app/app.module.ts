import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // Importa Firestore
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusPopoverComponent } from './status-popover/status-popover.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, StatusPopoverComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
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
    provideFirestore(() => getFirestore()), // Agrega Firestore aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
