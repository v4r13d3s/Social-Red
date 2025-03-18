import { Injectable, inject } from '@angular/core';
import {
  Auth,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword, // Añadida esta importación
} from '@angular/fire/auth';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router'; // Importa el Router
import { BehaviorSubject } from 'rxjs';
export interface User {
  email: string;
  password: string;
}

interface UserInfo {
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  nombre?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private router = inject(Router); // Inyecta el Router

  private firestore: Firestore = inject(Firestore);
  private userInfo = new BehaviorSubject<UserInfo | null>(null);

  currentUser$ = this.userInfo.asObservable();

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userInfo.next(JSON.parse(storedUser));
    }

    this._auth.onAuthStateChanged((user) => {
      if (user) {
        this.getUserAdditionalData(user.uid).then((additionalData) => {
          const userData = {
            displayName: additionalData?.nombre || user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            nombre: additionalData?.nombre,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          this.userInfo.next(userData);
        });
      } else {
        localStorage.removeItem('user');
        this.userInfo.next(null);
      }
    });
  }
  async isEmailRegistered(email: string): Promise<boolean> {
    try {
      const methods = await fetchSignInMethodsForEmail(this._auth, email);
      console.log('Métodos de inicio de sesión para', email, ':', methods);
      return methods.length > 0;
    } catch (error) {
      console.error('Error al verificar el correo:', error);
      throw error;
    }
  }

  async signUp(
    user: User,
    additionalData: { nombre: string; apellido: string; ciudad: string }
  ) {
    try {
      const isRegistered = await this.isEmailRegistered(user.email);
      if (isRegistered) {
        throw new Error('El correo electrónico ya está registrado.');
      }

      const userCredential = await createUserWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );

      const uid = userCredential.user.uid;

      const userDocRef = doc(this.firestore, 'users', uid);
      await setDoc(userDocRef, {
        nombre: additionalData.nombre,
        apellido: additionalData.apellido,
        ciudad: additionalData.ciudad,
        email: user.email,
      });

      console.log('Usuario registrado correctamente:', userCredential.user.uid);
      console.log('Datos adicionales guardados en Firestore:', additionalData);

      return userCredential;
    } catch (error: any) {
      console.error('Error en registro:', error);
      throw error;
    }
  }
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this._auth, provider);
      const user = result.user;

      const additionalData = await this.getUserAdditionalData(user.uid);

      this.userInfo.next({
        displayName: additionalData?.nombre || user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        nombre: additionalData?.nombre,
      });

      // Redirige al usuario a la ruta 'tabs/tab1' después del registro exitoso
      this.router.navigate(['/tabs/tab1']); // Sin el slash inicial

      return result;
    } catch (error) {
      console.error('Error en login con Google:', error);
      throw error;
    }
  }
  async getUserAdditionalData(
    uid: string
  ): Promise<{ nombre: string; apellido: string; ciudad: string } | null> {
    const userDocRef = doc(this.firestore, 'users', uid);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data() as {
        nombre: string;
        apellido: string;
        ciudad: string;
      };
    } else {
      return null;
    }
  }

  getCurrentUser(): FirebaseUser | null {
    return this._auth.currentUser;
  }

  async signOut() {
    try {
      await this._auth.signOut();
      this.userInfo.next(null);
      this.router.navigate(['/welcome']); // Redirige a la ruta de welcome
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  async isEmailInFirestore(email: string): Promise<boolean> {
    try {
      const usersRef = collection(this.firestore, 'users');
      const querySnapshot = await getDocs(
        query(usersRef, where('email', '==', email))
      );
      return querySnapshot.size > 0;
    } catch (error) {
      console.error('Error al verificar el correo en Firestore:', error);
      throw error;
    }
  }

  async signIn(user: User) {
    try {
      const isEmailInFirestore = await this.isEmailInFirestore(user.email);
      if (!isEmailInFirestore) {
        throw new Error('El correo no está registrado en Firestore.');
      }

      const userCredential = await signInWithEmailAndPassword(
        this._auth,
        user.email,
        user.password
      );

      const additionalData = await this.getUserAdditionalData(
        userCredential.user.uid
      );

      this.userInfo.next({
        displayName: additionalData?.nombre || userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        email: userCredential.user.email,
        nombre: additionalData?.nombre,
      });

      return userCredential;
    } catch (error: any) {
      console.error('Error en inicio de sesión:', error);

      if (error.code === 'auth/wrong-password') {
        throw new Error('Contraseña incorrecta');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('Usuario no encontrado');
      }

      throw error;
    }
  }
}
