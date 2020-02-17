import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[]=[];
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(()=>this.cargarHospitales());
  }

    cargarHospitales(){
    this._hospitalService.cargarHospitales().subscribe(hospitales =>{
      this.hospitales=hospitales;
    });
  }

  buscarHospital(hospital:string){

    if(hospital.length <= 0){
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(hospital)
    .subscribe(hospitales => this.hospitales=hospitales );
  }
  
  crearHospital(hospital:string){
    swal({
      title:'Crear hospital',
      text:'Ingrese el nombre del hospital',
      content: 'input',
      icon:'info',
      buttons:true,
      dangerMode:true
    })
    .then((valor:string) => {
      if(!valor || valor.length ===0){
        return
      }
      this._hospitalService.crearHospital(valor)
      .subscribe(()=>this.cargarHospitales());
    })
    ;

  }
  guardarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital)
    .subscribe();
  }

  borrarHospital(hospital: Hospital){
    this._hospitalService.borrarHospital(hospital._id)
    .subscribe(()=>this.cargarHospitales()
    );
  }

  actualizarImagen(hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
