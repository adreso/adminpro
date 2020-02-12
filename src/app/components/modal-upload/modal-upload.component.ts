import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from 'src/app/services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  usuario: Usuario;
  
  imagenSubir:File;

  imagenTemporal:any;
  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService

  ) {}

  ngOnInit() {
  }

  seleccionImage(archivo:File){
    if(!archivo){
      this.imagenSubir=null;
      return;
    }
    if(archivo.type.indexOf('image')<0){
      //swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'error');

    }
    this.imagenSubir = archivo


    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemporal=reader.result;
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
    .then( resp =>{
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();

    })
    .catch(err =>{
      console.log('error en la carga');
    })
    ;
  }


  cerrarModal(){
    this.imagenTemporal = null;
    this.imagenSubir=null;
    this._modalUploadService.ocultarModal();
  }
}
