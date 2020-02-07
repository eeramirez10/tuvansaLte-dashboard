import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TuvansaService } from 'src/app/services/tuvansa.service';
import { Router } from "@angular/router";

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password:string;

  errorLogin:boolean;
  errorMessage:string
  errorCode:string;

  swalSuccess:any = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  }

  constructor(private tuvasaService:TuvansaService, private router:Router, private ngZone:NgZone){
    
  }


  ngOnInit() {
  }

  login( f:NgForm){
   
    if( f.invalid){
      return;
    }

    Swal.fire({
      title:'Verificando credenciales',
      timer:2000
    })

    Swal.showLoading()

    this.tuvasaService.login(this.email,this.password).then(resp => {

      const Toast = Swal.mixin(this.swalSuccess);

      Toast.fire({
        icon:"success",
        title:"Login exitoso!!"
      })
      console.log(resp)
      this.ngZone.run(()=> this.router.navigate(['dashboard']) );
      
      
    }).catch(err => {

      Swal.fire({
        icon: 'error',
        title: 'Error login',
        html: `<strong> ${err.message}  </strong>` 
      })
   
    })

  }
}
