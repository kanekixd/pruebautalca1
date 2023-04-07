import { Component, OnInit } from '@angular/core';
import {EquipoService, Usuario} from '../../services/equipo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  //variable
   
  ListarU: Usuario[] = [];
  constructor(private EquipoService:EquipoService, private Router:Router){
    
  }
  
  ngOnInit(): void {
    this.listarusuarios();
  }

  listarusuarios()
{
  this.EquipoService.getusuarios().subscribe( 
    res=>{
      console.log(res)
      this.ListarU=<any>res;
    },
    err => console.log(err)
  );
}

deshabilitar(id:string)
{
  this.EquipoService.dehabilitar(id).subscribe(
    res=>{
      console.log('usuario deshabilitado');
      this.listarusuarios();
    },
    err=> console.log(err)
  );
  }
  modificar(id:string)
{
  this.Router.navigate(['/edit/'+id]);
}
}



