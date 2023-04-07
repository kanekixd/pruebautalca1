import { Component, OnInit } from '@angular/core';
import { Usuario, EquipoService } from 'src/app/services/equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  usuario: Usuario={
    idusuarios:'',
    nombre:'',
    email:'',
    contrasena:'',
    tipo:''
  };

  constructor(private EquipoService:EquipoService, private router:Router) { }
 
  ngOnInit(): void {
  }

  agregar(){

    this.EquipoService.addusuario(this.usuario).subscribe();
    this.router.navigate(['/inicio']);
  }
}

