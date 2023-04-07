import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  url='http://localhost:3000/api';
 
   constructor(
    private jwtHelper:JwtHelperService,
    private http: HttpClient) { }

   //get usuarios
   getusuarios()
   {
    return this.http.get(this.url);
   }
  
   //get un usuario
   getunusuario(id:string): Observable<Usuario[]>{
    return  this.http.get<Usuario[]>(this.url+'/'+id);
   }
   //agregar usuario
  addusuario(usuario:Usuario)
  {
    return this.http.post(this.url, usuario);
  }
  //eliminar
  dehabilitar(id:string){
    return this.http.delete(this.url+'/'+id);

  }
  //modificar usuario
  editusuario(id:string, usuario:Usuario){
    return this.http.put(this.url+'/'+id, usuario);
  }
  login(usuario:any){
    return this.http.post(`${this.url}/login`,usuario);
  }
  
  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;

    }
      return true ; 

  } 
} 



export interface Usuario{
  idusuarios:string;
  nombre?:string;
  email?:string;
  contrasena?:string;
  tipo?:string;

}
