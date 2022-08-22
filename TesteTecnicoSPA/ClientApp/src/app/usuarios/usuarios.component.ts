import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { UsuarioModel } from './usuarios.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  usuarios: Array<any> = new Array();

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.listarUsuarios();
  }

  atualizarUsuario(id: number) {
    this.usuariosService.atualizarUsuario(id, this.usuario).subscribe(usuario => {
      this.usuario = new UsuarioModel();
      this.listarUsuarios();
    }, err => {
      console.log("Erro ao atualizar", err)
    })
  }

  excluirUsuario(id: number) {
    this.usuariosService.excluirUsuario(id).subscribe(usuario => {
      this.usuario = new UsuarioModel();
      this.listarUsuarios();
    }, err => {
      console.log("Erro ao atualizar", err)
    })
  }

  editUsuario(usuario: UsuarioModel) {
    this.usuario = { ...usuario };
  }

  cadastrarUsuario() {    
    this.usuariosService.cadastrarUsuario(this.usuario).subscribe(usuario => {
      this.usuario = new UsuarioModel();
      this.listarUsuarios();
    }, err => {
      console.log("Erro ao cadastrar",err)
    })
  }

  salvarUsuario(form: NgForm) {
    if (this.usuario.id !== undefined) {
      this.usuariosService.atualizarUsuario(this.usuario.id, this.usuario).subscribe(() => {
        this.limpaForm(form);
      });
    } else {
      this.usuariosService.cadastrarUsuario(this.usuario).subscribe(() => {
        this.limpaForm(form);
      });
    }
  }

  listarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    }, err => {
      console.log("Erro ao listar", err)
    })
  };

  limpaForm(form: NgForm) {
    this.listarUsuarios();
    form.resetForm();
    this.usuario = {} as UsuarioModel;
  }


}
