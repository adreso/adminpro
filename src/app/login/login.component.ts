import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  
  auth2: any;

  constructor(
    public router: Router, 
    public _usuarioService:UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = this.email.length>1?true:false;
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
                  client_id:'892414061033-dg8uak9q36fa2h9dalms5cietiuc0brl.apps.googleusercontent.com',
                  cookiepolicy:'single_host_origin',
                  scope:'profile email'});
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ){
    this.auth2.attachClickHandler(element, {}, (googleUser) =>{
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle(token)
      .subscribe(resp => window.location.href ='#/dashboard');


      
    });
  }

  public ingresar(forma: NgForm) {
    console.log(forma.value);
    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    
    this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(correcto => this.router.navigate(['/dashboard']));
  
    // this.router.navigate(['/dashboard']);
  }

}
