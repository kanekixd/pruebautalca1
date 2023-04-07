import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipoService } from '../services/equipo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private equipoService:EquipoService,
    private router:Router

  ){}
  
  canActivate():boolean{
      if(!this.equipoService.isAuth()){
        console.log('Token no valido o ya expiro');
        this.router.navigate(['login']);
        return false;
      }    
    return true;
  }
  
}
