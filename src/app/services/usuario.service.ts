// usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'https://apirestful-0l0n.onrender.com/api/usuarios/search';

  constructor(private http: HttpClient) {}

  buscarUsuarios(query: string): Observable<any[]> {
    if (!query.trim()) return new Observable((observer) => observer.next([])); // Evita peticiones vacías
    return this.http.get<any[]>(`${this.apiUrl}?q=${query}`);
  }
}
