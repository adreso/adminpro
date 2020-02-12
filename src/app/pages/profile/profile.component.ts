import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  
  imagenSubir:File;

  imagenTemporal:any;

  constructor(
    public _usuarioService: UsuarioService
    ) {
      this.usuario=this._usuarioService.usuario;
     }

  ngOnInit() {
  }

  guardar(usuario: Usuario){
    this.usuario.nombre=usuario.nombre;
    if(!this.usuario.google){
      this.usuario.email=usuario.email;
    }
    

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImage(archivo:File){
    if(!archivo){
      this.imagenSubir=null;
      return;
    }
    if(archivo.type.indexOf('image')<0){
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');

    }
    this.imagenSubir = archivo


    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal=reader.result;
  }

  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}