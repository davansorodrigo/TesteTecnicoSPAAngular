import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from './usuarios/usuarios.model';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  listarUsuarios() : Observable<any> {
    return this.http.get(environment.apiUrl);
  }

  cadastrarUsuario(usuario: UsuarioModel): Observable<any> {
    return this.http.post(environment.apiUrl, usuario)
  }

  atualizarUsuario(id: any, usuario: UsuarioModel): Observable<any> {
    return this.http.put(environment.apiUrl.concat(id), usuario)
  }

  excluirUsuario(id: any): Observable<any> {
    return this.http.delete(environment.apiUrl.concat(id))
  }
}
