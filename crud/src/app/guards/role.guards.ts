import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipoService } from '../services/equipo.service';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private equipoService: EquipoService,
    public router: Router
  ){ }
  canActivate(route: ActivatedRouteSnapshot):boolean{
    
  
    const token = localStorage.getItem('token');

    
   

    if( !this.equipoService.isAuth() ){
      console.log('Usuario no autorizado para la vista');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
}