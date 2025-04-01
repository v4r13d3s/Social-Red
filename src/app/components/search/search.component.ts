// search.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: false,
})
export class SearchComponent implements OnInit {
  usuarios: any[] = [];
  searchQuery: string = '';
  loading: boolean = false; // Para mostrar un spinner

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {}

  onSearch(event: any) {
    this.searchQuery = event.detail.value; // Para Ionic es event.detail.value

    if (this.searchQuery.trim() !== '') {
      this.loading = true; // Mostrar cargando
      this.usuarioService.buscarUsuarios(this.searchQuery).subscribe(
        (response) => {
          this.usuarios = response.map((usuario) => ({
            nombre: usuario.nombre,
            imagen: usuario.imageUrl || 'assets/default-avatar.png', // Imagen por defecto
            estado: usuario.estado,
          }));
          this.loading = false; // Ocultar cargando
        },
        (error) => {
          console.error('Error al buscar usuarios:', error);
          this.loading = false;
        }
      );
    } else {
      this.usuarios = [];
    }
  }
}
