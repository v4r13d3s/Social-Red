import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,
})
export class SearchComponent implements OnInit {

  usuarios: any[] = [];
  apiUrl = 'https://apirestful-0l0n.onrender.com/api/usuarios';  // URL de la API
  searchQuery: string = '';  // Nueva variable para almacenar la consulta de búsqueda

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  onSearch(event: any) {
    this.searchQuery = event.target.value;  // Almacenar la búsqueda en searchQuery

    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.http.get<any[]>(`${this.apiUrl}?search=${this.searchQuery}`).subscribe(
        (response) => {
          this.usuarios = response.map(usuario => ({
            nombre: usuario.nombre,
            imagen: usuario.imagen,
            estado: usuario.estado
          }));
        },
        (error) => {
          console.error('Error al buscar usuarios:', error);
        }
      );
    } else {
      this.usuarios = [];
    }
  }
}
