import { Component, OnInit } from '@angular/core';
import { Usuario, EquipoService } from 'src/app/services/equipo.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario={
    idusuarios:'',
    email:'',
    contrasena:'',

  };
  
  loginincorrecto:boolean=false
  

  constructor(private equipoService: EquipoService, private router:Router) { }

  ngOnInit(){
    
  }
  

 login(){
    console.log(this.usuario);
    this.equipoService.login(this.usuario).subscribe( (res:any) =>{
    if(res==0){
      this.loginincorrecto=true
    }
    console.log(res);    
    localStorage.setItem('token', res.token);
    try {

      const decodedToken = JSON.parse (atob (res.token.split ('.')[1]));
      if(decodedToken.tipo==='admin'){
        localStorage.setItem('rol','admin')
        this.router.navigate(['inicio']);
      }else{
        localStorage.setItem('rol','user')
        this.router.navigate(['/edit/'+decodedToken.idusuarios]);
        
      }
      } catch (error) {
      
    }
      
    
    
    
    })
    
  }
  

}
